// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/ZenMonVault.sol";

// @title Interact
// @dev Interact is a script to interact with random contracts.

contract Interact is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("HH_PK");
        address deployerAddress = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        ZenMonVault zenMonVault = ZenMonVault(
            0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
        );
        VaultItem memory vault = zenMonVault.getVaults(deployerAddress)[0];
        console.log(vault.id, vault.token, vault.amount, vault.expiry);

        vm.stopBroadcast();
    }
}
