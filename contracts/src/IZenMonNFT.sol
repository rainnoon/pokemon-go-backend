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
    uint8 energy;
    uint40 energyUpdated;
    uint8 mood;
    uint40 moodUpdated;
    uint32[] accessories;
}

interface IZenMonNFT {
    function mint(
        address _to,
        string calldata _name,
        uint16 _base
    ) external returns (uint256 tokenId);

    function updateMood(address _owner, uint8 _mood) external;

    function updateEnergy(address _owner, uint8 _energy) external;

    function getMonster(address _owner) external view returns (Monster memory);
}
