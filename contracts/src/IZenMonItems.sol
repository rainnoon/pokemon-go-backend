// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IZenMonItems
/// @dev IZenMonItems is an interface for ZenMonItems

struct SavingItem {
    uint32 id;
    string name;
    uint256 fee;
    address feeToken;
    string feeTokenSymbol;
    uint16 lock;
    uint8 itemType;
    uint8 itemBoost;
}

interface IZenMonItems {
    function getItems() external view returns (SavingItem[] memory);

    function getItem(uint32) external view returns (SavingItem memory);
}
