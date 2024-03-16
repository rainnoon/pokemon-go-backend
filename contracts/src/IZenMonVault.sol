// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IZenMonVault
/// @dev IZenMonVault is an interface for ZenMonVault.

struct VaultItem {
    uint256 id;
    string symbol;
    address token;
    uint256 amount;
    uint40 expiry;
}

interface IZenMonVault {
    function lockFunds(
        address _user,
        string calldata _symbol,
        address _tokenAddress,
        uint256 _amount,
        uint16 _lock
    ) external payable;

    function getVault(uint256 _id) external view returns (VaultItem memory);

    function getVaults(
        address _user
    ) external view returns (VaultItem[] memory);
}
