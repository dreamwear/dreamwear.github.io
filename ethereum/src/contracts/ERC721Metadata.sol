// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC721Metadata.sol";
import "./ERC165.sol";

contract ERC721Metadata is IERC721Metadata, ERC165 {
    string private _name;

    string private _symbol;

    constructor(string memory named, string memory symboled) {
        _registerInterface(
            bytes4(
                keccak256("name()") ^
                    keccak256("symbol()") ^
                    keccak256("tokenURI(uint256)")
            )
        );

        _name = named;
        _symbol = symboled;
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 _tokenId) external view returns (string memory) {}
}
