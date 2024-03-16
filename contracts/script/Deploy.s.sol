// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/ZenMonController.sol";
import "../src/ZenMonNFT.sol";
import "../src/ZenMonItems.sol";
import "../src/ZenMonVault.sol";
import "../src/ZenMonViewer.sol";

// @title Deploy
// @dev Deploy is a script to deploy contracts.

contract Deploy is Script {
    function run() external {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        // uint256 deployerPrivateKey = vm.envUint("BURNER_PK");
        uint256 deployerPrivateKey = vm.envUint("HH_PK");
        vm.startBroadcast(deployerPrivateKey);

        // Declare and initialize the controller and its address
        ZenMonController controller = new ZenMonController();
        address controllerAddress = address(controller);

        // Declare and initialize the NFT contract and its address with the controller's address
        ZenMonNFT nft = new ZenMonNFT(controllerAddress);
        address nftAddress = address(nft);

        ZenMonItems items = new ZenMonItems();
        address itemsAddress = address(items);

        // Declare and initialize the Vault contract and its address with the controller's address
        ZenMonVault vault = new ZenMonVault(controllerAddress);
        address vaultAddress = address(vault);

        // Initialize the Viewer contract with the NFT and Vault addresses
        ZenMonViewer viewer = new ZenMonViewer(
            nftAddress,
            itemsAddress,
            vaultAddress
        );

        // Set the NFT and Vault contracts in the controller
        controller.setNFTContract(nftAddress);
        controller.setItemsContract(itemsAddress);
        controller.setVaultContract(vaultAddress);

        // Create some items
        //name, fee, feeToken, feeTokenSymbol, lock, id, itemType, itemBoost
        items.createItem(
            1,
            "Salmon",
            5000000000000000000,
            address(0),
            "CUSD",
            30,
            0,
            1
        );
        items.createItem(
            2,
            "Sea Bass",
            7500000000000000000,
            address(0),
            "CUSD",
            90,
            0,
            5
        );
        items.createItem(
            3,
            "Chutoro",
            10000000000000000000,
            address(0),
            "CUSD",
            180,
            0,
            10
        );
        items.createItem(
            4,
            "Toro",
            10000000000000000000,
            address(0),
            "CUSD",
            360,
            0,
            20
        );

        vm.stopBroadcast();
    }
}
