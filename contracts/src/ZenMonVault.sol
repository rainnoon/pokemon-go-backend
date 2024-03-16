// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ZenMonVault
/// @dev ZenMonVault is a contract to store Tokens for a specific ZenMonNFT.

import "openzeppelin-contracts/contracts/access/AccessControl.sol";

contract ZenMonVault is AccessControl {
    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");

    constructor(address _controller) {
        _grantRole(CONTROLLER_ROLE, _controller);
    }
}
