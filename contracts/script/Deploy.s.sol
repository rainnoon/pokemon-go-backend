// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/ZenMonController.sol";
import "../src/ZenMonNFT.sol";
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

        // Declare and initialize the Vault contract and its address with the controller's address
        ZenMonVault vault = new ZenMonVault(controllerAddress);
        address vaultAddress = address(vault);

        // Initialize the Viewer contract with the NFT and Vault addresses
        ZenMonViewer viewer = new ZenMonViewer(nftAddress, vaultAddress);

        vm.stopBroadcast();
    }
}
