//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Bridge is Ownable {
    uint256 public serviceFee = 100000000000000;

    function getNetAmount(uint256 _amount) internal view returns (uint256 netAmount) {
        return _amount - serviceFee;
    }
}
