//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "./Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Bridge is Ownable {
    uint256 public serviceFee = 100000000000000;
    mapping(string => address) public tokens;
    mapping(address => address) public nativeTokens;

    bytes2 private wrapPrefix = "rs";

    event Lock(uint8 targetChain, address token, uint256 amount);
    event Unlock(address token, uint256 amount, address receiver);
    event Mint(address token, uint256 amount, address receiver);
    event Burn(address token, uint256 amount, address receiver);

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
        require(_amount > serviceFee, "Too small amount!");

        uint256 netAmount = getNetAmount(_amount);

        IERC20(_nativeToken).transfer(this.owner(), serviceFee);
        IERC20(_nativeToken).transfer(_receiver, netAmount);

        emit Unlock(_nativeToken, _amount, _receiver);
    }

    function mint(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint8 _tokenDecimals,
        uint256 _amount,
        address _receiver,
        address _nativeToken
    ) external returns (address) {
        Token token;
        string memory _wrappedName = string(abi.encodePacked(wrapPrefix, _tokenName));

        if (tokens[_wrappedName] == address(0x0)) {
            string memory _wrappedSymbol = string(abi.encodePacked(wrapPrefix, _tokenSymbol));
            token = new Token(_wrappedName, _wrappedSymbol, _tokenDecimals);
            address _tokenAddress = address(token);
            tokens[_wrappedName] = _tokenAddress;
            nativeTokens[_tokenAddress] = _nativeToken;
        } else {
            token = Token(tokens[_wrappedName]);
        }

        token.mint(_receiver, _amount);
        return tokens[_wrappedName];
    }

    function burn(address _token, uint256 _amount) external {
        Token(_token).burn(msg.sender, _amount);

        emit Burn(_token, _amount, msg.sender);
    }

    function getNetAmount(uint256 _amount) internal view returns (uint256 netAmount) {
        return _amount - serviceFee;
    }
}
