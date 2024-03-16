// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-contracts/contracts/access/AccessControl.sol";

// @title BasedNFT
// @dev BasedNFT is an ERC721 token with access control, for testing purposes.

contract BasedNFT is ERC721, ERC721Enumerable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 tokenIds = 0;

    constructor() ERC721("PDNFT", "NFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint() external returns (uint256) {
        tokenIds++;
        _mint(msg.sender, tokenIds);
        emit Transfer(address(0), msg.sender, 1000);
        return tokenIds;
    }

    function getTokensForAddress(
        address _address
    ) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_address);
        uint256[] memory ids = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            ids[i] = tokenOfOwnerByIndex(_address, i);
        }
        return ids;
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
