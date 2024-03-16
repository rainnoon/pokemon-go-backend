// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ZenMonController
/// @dev ZenMonController is a contract to control ZenMonNFT and ZenMonVault.
/// Holders interact with ZenMonNFT and ZenMonVault through this contract.

import "openzeppelin-contracts/contracts/access/AccessControl.sol";
import "./IZenMonNFT.sol";
import "./IZenMonItems.sol";
import "./IZenMonVault.sol";

contract ZenMonController is AccessControl {
    IZenMonNFT public nft;
    IZenMonItems public items;
    IZenMonVault public vault;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /// @dev Sets the NFT contract address
    function setNFTContract(
        address _nftAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        nft = IZenMonNFT(_nftAddress);
    }

    /// @dev Sets the Items contract address
    function setItemsContract(
        address _itemsAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        items = IZenMonItems(_itemsAddress);
    }

    /// @dev Sets the Vault contract address
    function setVaultContract(
        address _vaultAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        vault = IZenMonVault(_vaultAddress);
    }

    function createMonster(
        string calldata _name,
        uint16 _base
    ) external returns (uint256 monsterId) {
        monsterId = nft.mint(msg.sender, _name, _base);
    }

    function purchaseBoost(uint32 _id) external payable {
        SavingItem memory item = items.getItem(_id);
        require(item.id > 0, "Item not found");

        // Network token purchase
        if (msg.value > 0) {
            require(msg.value == item.fee, "Incorrect fee");
        }

        // Handle ERC20 token use case here
        // Not yet supported
        if (item.feeToken != address(0)) {
            // Transfer token to vault
        }

        // Create vault
        vault.lockFunds{value: msg.value}(
            msg.sender,
            item.feeTokenSymbol,
            item.feeToken,
            item.fee,
            item.lock
        );

        //Apply boost
        if (item.itemType == 0) {
            nft.updateEnergy(msg.sender, item.itemBoost);
        } else if (item.itemType == 1) {
            nft.updateMood(msg.sender, item.itemBoost);
        }
    }
}
