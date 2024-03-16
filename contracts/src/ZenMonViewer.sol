// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ZenMonViewer
/// @dev ZenMonViewer is a contract to view ZenMonNFT and ZenMonVault properties.
/// This contract is for read-only purposes. It does not modify any state.
/// This is helpful to the frontend and negates the need for a graph for the alpha

import "./IZenMonNFT.sol";
import "./IZenMonItems.sol";
import "./IZenMonVault.sol";

contract ZenMonViewer {
    IZenMonNFT public nft;
    IZenMonItems public items;
    IZenMonVault public vault;

    constructor(
        address _nftAddresss,
        address _itemsAddress,
        address _vaultAddress
    ) {
        nft = IZenMonNFT(_nftAddresss);
        items = IZenMonItems(_itemsAddress);
        vault = IZenMonVault(_vaultAddress);
    }

    function getMonster(address _owner) external view returns (Monster memory) {
        return nft.getMonster(_owner);
    }

    function getItems() external view returns (SavingItem[] memory) {
        return items.getItems();
    }

    function getVaults() external view returns (VaultItem[] memory) {
        return vault.getVaults(msg.sender);
    }
}
