// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ZenMonVault
/// @dev ZenMonVault is a contract to store Tokens for a specific ZenMonNFT.

import "openzeppelin-contracts/contracts/access/AccessControl.sol";
import "openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "./IZenMonVault.sol";

contract ZenMonVault is AccessControl, IZenMonVault, ReentrancyGuard {
    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");

    uint256 public vaultIds;

    mapping(address => uint256[]) public userVaults;
    mapping(uint256 => VaultItem) public vaultItems;

    // 提款事件
    event Withdrawn(address indexed user, uint256 vaultId, uint256 amount, address token);

    constructor(address _controller) {
        _grantRole(CONTROLLER_ROLE, _controller);
    }

    function lockFunds(
        address _user,
        string calldata _symbol,
        address _tokenAddress,
        uint256 _amount,
        uint16 _lock
    ) external payable onlyRole(CONTROLLER_ROLE) {
        // 验证 ETH 转账金额
        if (_tokenAddress == address(0)) {
            require(msg.value == _amount, "Incorrect ETH amount");
        }
        // 对于 ERC20 代币，从用户地址转到合约
        else {
            require(
                IERC20(_tokenAddress).transferFrom(_user, address(this), _amount),
                "Token transfer failed"
            );
        }

        // 创建保管库记录
        vaultIds++;
        vaultItems[vaultIds] = VaultItem({
            id: vaultIds,
            symbol: _symbol,
            token: _tokenAddress,
            amount: _amount,
            expiry: uint40(
                uint40(block.timestamp) + (uint40(_lock) * 60 * 60 * 24)
            )
        });
        userVaults[_user].push(vaultIds);
    }

    function withdraw(uint256 _vaultId) external nonReentrant {
        // 获取保管库信息
        VaultItem storage vault = vaultItems[_vaultId];
        require(vault.id != 0, "Vault not found");

        // 验证是否是保管库拥有者
        bool isOwner = false;
        uint256[] storage userVaultIds = userVaults[msg.sender];
        for (uint256 i = 0; i < userVaultIds.length; i++) {
            if (userVaultIds[i] == _vaultId) {
                isOwner = true;
                // 移除这个保管库ID
                userVaultIds[i] = userVaultIds[userVaultIds.length - 1];
                userVaultIds.pop();
                break;
            }
        }
        require(isOwner, "Not vault owner");

        // 检查是否到期
        require(
            block.timestamp >= vault.expiry,
            "Lock period not expired"
        );

        // 保存提款信息
        uint256 amount = vault.amount;
        address token = vault.token;

        // 删除保管库数据
        delete vaultItems[_vaultId];

        // 执行转账
        if (token == address(0)) {
            // ETH 转账
            (bool success,) = payable(msg.sender).call{value: amount}("");
            require(success, "ETH transfer failed");
        } else {
            // ERC20 转账
            require(
                IERC20(token).transfer(msg.sender, amount),
                "Token transfer failed"
            );
        }

        emit Withdrawn(msg.sender, _vaultId, amount, token);
    }

    function getVault(uint256 _id) external view returns (VaultItem memory) {
        return vaultItems[_id];
    }

    function getVaults(address _user) external view returns (VaultItem[] memory) {
        uint256[] memory userVaultIds = userVaults[_user];
        VaultItem[] memory vaults = new VaultItem[](userVaultIds.length);
        for (uint256 i = 0; i < userVaultIds.length; i++) {
            vaults[i] = vaultItems[userVaultIds[i]];
        }
        return vaults;
    }

    function isVaultExpired(uint256 _vaultId) external view returns (bool) {
        VaultItem memory vault = vaultItems[_vaultId];
        require(vault.id != 0, "Vault not found");
        return block.timestamp >= vault.expiry;
    }

    function timeToExpiry(uint256 _vaultId) external view returns (uint256) {
        VaultItem memory vault = vaultItems[_vaultId];
        require(vault.id != 0, "Vault not found");
        if (block.timestamp >= vault.expiry) {
            return 0;
        }
        return vault.expiry - uint40(block.timestamp);
    }
}
