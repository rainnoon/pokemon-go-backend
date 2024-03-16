// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ZenMonNFT
/// @dev ZenMonNFT is a contract for the ZenMon NFTs.
/// It holds the current status of a monster.
/// It is based on the ERC721 standard and uses the OpenZeppelin library.
/// It also uses the AccessControl library to restrict minting to the admin.
/// The NFTs are soulbound to a wallet and cannot be transferred.

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/access/AccessControl.sol";
import "./IZenMonNFT.sol";

contract ZenMonNFT is IZenMonNFT, ERC721, AccessControl {
    uint256 public tokenIds = 0;

    uint8 baseMoodDrop = 2;
    uint8 baseEnergyDrop = 2;

    mapping(address => Monster) public monsters;

    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");

    constructor(address _controller) ERC721("ZenMonNFT", "ZENMON") {
        _grantRole(CONTROLLER_ROLE, _controller);
    }

    function mint(
        address _to,
        string calldata _name,
        uint16 _base
    ) external onlyRole(CONTROLLER_ROLE) returns (uint256) {
        require(!monsters[_to].live, "This address already owns an NFT");

        tokenIds++;
        monsters[_to] = Monster({
            id: tokenIds,
            name: _name,
            base: _base,
            status: 0,
            live: true,
            energy: 50,
            energyUpdated: uint40(block.timestamp),
            mood: 20,
            moodUpdated: uint40(block.timestamp),
            accessories: new uint32[](0)
        });

        _safeMint(_to, tokenIds);
        return tokenIds;
    }

    function updateEnergy(
        address _owner,
        uint8 _energy
    ) external onlyRole(CONTROLLER_ROLE) {
        Monster storage monster = monsters[_owner];
        uint40 daysPassed = (uint40(block.timestamp) - monster.energyUpdated) /
            60 /
            60 /
            24;

        if (daysPassed > 0) {
            uint8 energyDrop = baseEnergyDrop * uint8(daysPassed);
            if (monster.energy > energyDrop) {
                monster.energy -= energyDrop;
            } else {
                monster.energy = 0;
            }
        }

        if (monster.energy + _energy > 100) {
            monsters[_owner].energy = 100;
        } else {
            monsters[_owner].energy += _energy;
        }
        monsters[_owner].energyUpdated = uint40(block.timestamp);
    }

    function updateMood(
        address _owner,
        uint8 _mood
    ) external onlyRole(CONTROLLER_ROLE) {
        Monster storage monster = monsters[_owner];
        uint40 daysPassed = (uint40(block.timestamp) - monster.moodUpdated) /
            60 /
            60 /
            24;

        if (daysPassed > 0) {
            uint8 moodDrop = baseMoodDrop * uint8(daysPassed);
            if (monster.mood > moodDrop) {
                monster.mood -= moodDrop;
            } else {
                monster.mood = 0;
            }
        }

        if (monster.mood + _mood > 100) {
            monsters[_owner].mood = 100;
        } else {
            monsters[_owner].mood += _mood;
        }
        monsters[_owner].moodUpdated = uint40(block.timestamp);
    }

    /// @dev Returns a monster for a user's address
    function getMonster(address _owner) external view returns (Monster memory) {
        return monsters[_owner];
    }

    // Override functions to make the token soulbound (non-transferable)
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);

        require(
            from == address(0) || to == address(0),
            "SoulboundToken: token cannot be transferred"
        );

        return super._update(to, tokenId, auth);
    }

    // Required boilerplate
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
