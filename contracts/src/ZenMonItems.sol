// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ZenMonItems
/// @dev ZenMonItems is a contract for the ZenMon Boost Items.
/// It holds the current available boosts

import "openzeppelin-contracts/contracts/access/AccessControl.sol";
import "./IZenMonItems.sol";

contract ZenMonItems is AccessControl {
    SavingItem[] public items;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createItem(
        uint32 _id,
        string calldata _name,
        uint256 _fee,
        address _feeToken,
        string calldata _feeTokenSymbol,
        uint16 _lock,
        uint8 _itemType,
        uint8 _itemBoost
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        items.push(
            SavingItem({
                id: _id,
                name: _name,
                fee: _fee,
                feeToken: _feeToken,
                feeTokenSymbol: _feeTokenSymbol,
                lock: _lock,
                itemType: _itemType,
                itemBoost: _itemBoost
            })
        );
    }

    function getItems() external view returns (SavingItem[] memory) {
        return items;
    }

    function getItem(
        uint32 _id
    ) external view returns (SavingItem memory item) {
        for (uint256 i = 0; i < items.length; i++) {
            if (items[i].id == _id) {
                return items[i];
            }
        }
        return item;
    }
}
