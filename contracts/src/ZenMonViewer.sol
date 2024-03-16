// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ZenMonViewer
/// @dev ZenMonViewer is a contract to view ZenMonNFT and ZenMonVault properties.
/// This contract is for read-only purposes. It does not modify any state.
/// This is helpful to the frontend and negates the need for a graph for the alpha

import "./IZenMonNFT.sol";
import "./IZenMonVault.sol";

contract ZenMonViewer {
    IZenMonNFT public nft;
    IZenMonVault public vault;

    constructor(address _nftAddresss, address _vaultAddress) {
        nft = IZenMonNFT(_nftAddresss);
        vault = IZenMonVault(_vaultAddress);
    }
}
