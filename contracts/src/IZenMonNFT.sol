// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IZenMonNFT
/// @dev IZenMonNFT is an interface for ZenMonNFT.

struct Monster {
    uint256 id;
    string name;
    uint16 base;
    uint8 status;
    bool live;
    uint32[] accessories;
    uint40[] timestamps;
}

interface IZenMonNFT {}
