// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721 {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );

    mapping(uint256 => address) private _tokenOwner;

    mapping(address => uint256) private _OwnedTokensCount;

    mapping(uint256 => address) private _tokenApprovals;

    function balanceOf(address _owner) public view returns (uint256) {
        require(
            _owner != address(0),
            "ERC721: The supplied owner address is not a valid address"
        );

        return _OwnedTokensCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address) {
        address owner = _tokenOwner[_tokenId];

        require(
            owner != address(0),
            "ERC721: The supplied tokenId is not valid "
        );

        return owner;
    }

    // function safeTransferFrom(
    //     address _from,
    //     address _to,
    //     uint256 _tokenId,
    //     bytes data
    // ) external payable {}

    // function safeTransferFrom(
    //     address _from,
    //     address _to,
    //     uint256 _tokenId
    // ) external payable {}

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        require(
            _exists(_tokenId),
            "ERC721: The supplied 'tokenId' does not exist"
        );
        require(
            _from == ownerOf(_tokenId),
            "ERC721: The supplied 'from' address is not the owner of the token"
        );
        require(
            _to != address(0),
            "ERC721: The supplied 'to' address is not a valid address"
        );

        _OwnedTokensCount[_from] -= 1;
        _OwnedTokensCount[_to] += 1;
        _tokenOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) external {
        address owner = ownerOf(_tokenId);

        require(
            msg.sender == owner,
            "ERC721: The message sender is not the owner of the token"
        );
        require(
            _to != owner,
            "ERC721: The supplied address is not the owner of the token"
        );

        _tokenApprovals[_tokenId] = _to;

        emit Approval(owner, _to, _tokenId);
    }

    function _isApprovedOrOwner(address _spender, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        require(
            _exists(_tokenId),
            "ERC721: The supplied 'tokenId' does not exist"
        );

        address owner = ownerOf(_tokenId);
        return (_spender == owner || _getApproved(_tokenId) == _spender);
    }

    function _getApproved(uint256 _tokenId) internal view returns (address) {
        require(
            _exists(_tokenId),
            "ERC721: approved query for nonexistent token"
        );

        return _tokenApprovals[_tokenId];
    }

    function _exists(uint256 _tokenId) internal view returns (bool) {
        address owner = _tokenOwner[_tokenId];
        return owner != address(0);
    }

    function _mint(address _to, uint256 _tokenId) internal virtual {
        require(
            _to != address(0),
            "ERC721: The supplied address is not a valid address"
        );
        require(
            !_exists(_tokenId),
            "ERC721: The supplied 'tokenId' already exists"
        );

        _tokenOwner[_tokenId] = _to;
        _OwnedTokensCount[_to] += 1;

        emit Transfer(address(0), _to, _tokenId);
    }
}
