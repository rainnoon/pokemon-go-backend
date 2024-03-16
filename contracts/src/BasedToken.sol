// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "openzeppelin-contracts/contracts/access/AccessControl.sol";

// @title BasedToken
// @dev BasedToken is an ERC20 token with permit and access control, for testing purposes.

contract BasedToken is ERC20, ERC20Permit, AccessControl {
    constructor() ERC20("PDToken", "PD") ERC20Permit("PDToken") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
