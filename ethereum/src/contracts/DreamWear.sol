// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Connector.sol";

contract DreamWear is ERC721Connector {
    string[] private dreams;

    mapping(string => bool) private _dreamExists;

    function mint(string memory _dream) public {
        require(!_dreamExists[_dream], "Error - Dream already exists!");

        dreams.push(_dream);
        uint256 _id = dreams.length - 1;

        _mint(msg.sender, _id);

        _dreamExists[_dream] = true;
    }

    constructor() ERC721Connector("DreamWear", "DW") {}
}
