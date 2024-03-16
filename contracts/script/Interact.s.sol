// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/BasedNFT.sol";
import "../src/BasedToken.sol";

// @title Interact
// @dev Interact is a script to interact with random contracts.

contract Interact is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("HH_PK");
        vm.startBroadcast(deployerPrivateKey);
        BasedNFT basedNFT = BasedNFT(
            0x0000000000000000000000000000000000000000
        ); //<addresshere within ()>

        basedNFT.mint();
        console.log(basedNFT.totalSupply());
        vm.stopBroadcast();
    }
}
