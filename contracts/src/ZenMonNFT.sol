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
    mapping(address => Monster) public monsters;

    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");

    constructor(address _controller) ERC721("ZenMonNFT", "ZENMON") {
        _grantRole(CONTROLLER_ROLE, _controller);
    }

    function mint(
        address _to,
        string calldata _name,
        uint16 _base
    ) external onlyRole(CONTROLLER_ROLE) {
        require(!monsters[_to].live, "This address already owns an NFT");

        monsters[_to] = Monster({
            id: tokenIds,
            name: _name,
            base: _base,
            status: 0,
            live: true,
            accessories: new uint32[](0),
            timestamps: new uint40[](0)
        });

        _safeMint(_to, tokenIds);
        tokenIds++;
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
