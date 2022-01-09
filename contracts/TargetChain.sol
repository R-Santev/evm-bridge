//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";
import "./Bridge.sol";

contract TargetChainBridge is Bridge {
    mapping(string => address) public tokens;

    bytes2 private wrapPrefix = "rs";

    event Mint(address token, uint256 amount, address receiver);
    event Burn(address token, uint256 amount, address receiver);

    function mint(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint8 _tokenDecimals,
        uint256 _amount,
        address _receiver
    ) external {
        Token token;
        string memory _wrappedName = string(abi.encodePacked(wrapPrefix, _tokenName));

        if (tokens[_wrappedName] == address(0x0)) {
            string memory _wrappedSymbol = string(abi.encodePacked(wrapPrefix, _tokenSymbol));
            token = new Token(_wrappedName, _wrappedSymbol, _tokenDecimals);
            address _tokenAddress = address(token);
            tokens[_wrappedName] = _tokenAddress;
        } else {
            token = Token(tokens[_wrappedName]);
        }

        token.mint(_receiver, _amount);
    }

    function burn(address _token, uint256 _amount) external {
        require(_amount > serviceFee, "Too small amount!");

        uint256 netAmount = getNetAmount(_amount);

        Token(_token).transferFrom(msg.sender, this.owner(), serviceFee);
        Token(_token).burn(msg.sender, netAmount);

        emit Burn(_token, netAmount, msg.sender);
    }
}
