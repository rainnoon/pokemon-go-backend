// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/BasedNFT.sol";
import "../src/BasedToken.sol";

// @title Deploy
// @dev Deploy is a script to deploy contracts.

contract Deploy is Script {
    function run() external {
        //uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        // uint256 deployerPrivateKey = vm.envUint("BURNER_PK");
        uint256 deployerPrivateKey = vm.envUint("HH_PK");
        vm.startBroadcast(deployerPrivateKey);
        new BasedNFT();
        new BasedToken();
        vm.stopBroadcast();
    }
}
