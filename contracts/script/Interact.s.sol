// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/ZenMonNFT.sol";

// @title Interact
// @dev Interact is a script to interact with random contracts.

contract Interact is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("HH_PK");
        address deployerAddress = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);
        ZenMonNFT zenMonNFT = ZenMonNFT(
            0x0000000000000000000000000000000000000000
        ); //Replace with contract address when needed
        zenMonNFT.mint(deployerAddress, "Jiji", 0);
        console.log(zenMonNFT.tokenIds());
        vm.stopBroadcast();
    }
}
