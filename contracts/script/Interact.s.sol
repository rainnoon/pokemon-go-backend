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
            0xA507F14321FdB7EC26d559A15b8CA5055c37c0Ca
        );
        VaultItem memory vault = zenMonVault.getVaults(deployerAddress)[0];
        console.log(vault.id, vault.token, vault.amount, vault.expiry);

        vm.stopBroadcast();
    }
}
