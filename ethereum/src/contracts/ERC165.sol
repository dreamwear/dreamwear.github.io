// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC165.sol";

contract ERC165 is IERC165 {
    mapping(bytes4 => bool) private _supportedInterfaces;

    constructor() {
        _supportedInterfaces[this.supportsInterface.selector] = true;
    }

    // Function finger print: 0x01ffc9a7
    function supportsInterface(bytes4 interfaceID)
        external
        view
        override
        returns (bool)
    {
        return _supportedInterfaces[interfaceID];
    }

    function _registerInterface(bytes4 interfaceID) internal {
        require(interfaceID != 0xffffffff, "ERC165: invalid interface");
        _supportedInterfaces[interfaceID] = true;
    }
}
