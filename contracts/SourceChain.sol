//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Bridge.sol";

contract SourceChainBridge is Bridge {
    event Lock(uint8 targetChain, address token, uint256 amount);
    event Unlock(address token, uint256 amount, address receiver);

    function lock(
        uint8 _targetChain,
        address _nativeToken,
        uint256 _amount
    ) external {
        require(_amount > serviceFee, "Too small amount!");

        uint256 netAmount = getNetAmount(_amount);

        IERC20(_nativeToken).transferFrom(msg.sender, this.owner(), serviceFee);
        IERC20(_nativeToken).transferFrom(msg.sender, address(this), netAmount);

        emit Lock(_targetChain, _nativeToken, netAmount);
    }

    function unlock(
        address _nativeToken,
        uint256 _amount,
        address _receiver
    ) external {
        IERC20(_nativeToken).transfer(_receiver, _amount);

        emit Unlock(_nativeToken, _amount, _receiver);
    }
}
