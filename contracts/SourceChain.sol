//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.11;

// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SourceChainBridge is Ownable {
    uint256 public serviceFee = 100000000000000;

    event Lock(uint8 targetChain, address token, uint256 amount);
    event Unlock(address token, uint256 amount, address receiver);

    function lock(
        uint8 _targetChain,
        address _nativeToken,
        uint256 _amount
    ) external {
        uint256 netAmount = getNetAmount(_amount);

        IERC20(_nativeToken).transferFrom(msg.sender, this.owner(), serviceFee);
        IERC20(_nativeToken).transferFrom(msg.sender, address(this), netAmount);

        emit Lock(_targetChain, _nativeToken, netAmount);
    }

    function getNetAmount(uint256 _amount) internal view returns (uint256 netAmount) {
        return _amount - serviceFee;
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
