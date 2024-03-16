// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ZenMonVault
/// @dev ZenMonVault is a contract to store Tokens for a specific ZenMonNFT.

import "openzeppelin-contracts/contracts/access/AccessControl.sol";
import "./IZenMonVault.sol";

contract ZenMonVault is AccessControl, IZenMonVault {
    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");

    uint256 public vaultIds;

    mapping(address => uint256[]) public userVaults;
    mapping(uint256 => VaultItem) public vaultItems;

    constructor(address _controller) {
        _grantRole(CONTROLLER_ROLE, _controller);
    }

    function lockFunds(
        address _user,
        string calldata _symbol,
        address _tokenAddress,
        uint256 _amount,
        uint16 _lock
    ) external payable onlyRole(CONTROLLER_ROLE) {
        // Lock funds for a specific token
        vaultIds++;
        vaultItems[vaultIds] = VaultItem({
            id: vaultIds,
            symbol: _symbol,
            token: _tokenAddress,
            amount: _amount,
            expiry: uint40(
                uint40(block.timestamp) + (uint40(_lock) * 60 * 60 * 24)
            )
        });
        userVaults[_user].push(vaultIds);
    }

    function getVault(uint256 _id) external view returns (VaultItem memory) {
        return vaultItems[_id];
    }

    function getVaults(
        address _user
    ) external view returns (VaultItem[] memory) {
        uint256[] memory userVaultIds = userVaults[_user];
        VaultItem[] memory vaults = new VaultItem[](userVaultIds.length);
        for (uint256 i = 0; i < userVaultIds.length; i++) {
            vaults[i] = vaultItems[userVaultIds[i]];
        }
        return vaults;
    }
}
