// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IZenMonVault
/// @dev IZenMonVault is an interface for ZenMonVault.

struct VaultItem {
    uint256 id;
    address token;
    uint256 amount;
    uint40 expiry;
}

interface IZenMonVault {
    function lockFunds(
        address _user,
        address _tokenAddress,
        uint256 _amount,
        uint16 _lock
    ) external returns (uint256 vaultId);

    function getVaults(
        address _user
    ) external view returns (VaultItem[] memory);
}
