// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    using Strings for uint256;

    string private baseURI;
    string private baseExtension = ".json";

 

    mapping(uint256 => bool) private _tokenForSale;
    mapping(uint256 => uint256) private _tokenPrice;

    Counters.Counter private _tokenIds;
    mapping(string => bool) private _tokenExists;
    uint256[] private totalTokens;

    constructor(
        string memory _initBaseURI,
        string memory tokenName,
        string memory tokenSymbol
       
    ) ERC721(tokenName, tokenSymbol) {
        setBaseURI(_initBaseURI);
       
    }

    function mint(string memory _tokenURI, string memory _setBaseURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        totalTokens.push(newItemId);
        _mint(msg.sender, newItemId);
        _tokenForSale[newItemId] = false;
        setBaseURI(_setBaseURI);
        _setTokenURI(newItemId, _tokenURI);
        return newItemId;
    }

    // function mintInBatch(uint256 noOfTokens) public {
    //     for (uint256 i = 0; i < noOfTokens; i++) {
    //         mint();
    //     }
    // }

   

    function setBaseURI(string memory _newBaseURI) internal {
        baseURI = _newBaseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setTokenForSale(uint256 tokenId, uint256 price) public {
        require(_exists(tokenId), "Token does not exist!");
        require(
            ownerOf(tokenId) == _msgSender(),
            "Only owner can set a token for sale!"
        );
        _tokenForSale[tokenId] = true;
        _tokenPrice[tokenId] = price;
    }

    function changeTokenPrice(uint256 tokenId, uint256 price) public {
        require(_exists(tokenId), "Token does not exist!");
        require(
            _tokenForSale[tokenId],
            "Token is not for sale, set it sale first!"
        );
        require(
            ownerOf(tokenId) == _msgSender(),
            "Only owner can set the value!"
        );
        _tokenPrice[tokenId] = price;
    }

    function buyNFT(uint256 tokenId) public payable {
        require(_tokenForSale[tokenId], "Token is currently not for sale!");
        address owner = ownerOf(tokenId);
        require(_msgSender()!= address(0), "Buyer address cannot be zero");
        require(_msgSender() != owner, "Cannot buy owned NFT");
        uint256 userBalance = msg.sender.balance / 10**18;
        uint256 tokenPrice = getTokenPrice(tokenId);
        require(userBalance > tokenPrice, "You dont have enough cash");
        payable(owner).transfer(msg.value);
        _transfer(owner, _msgSender(), tokenId);
        _tokenForSale[tokenId] = false;
    }

    function removeTokenFromSale(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(_tokenForSale[tokenId], "Token is already set to not for sale");
        require(
            ownerOf(tokenId) == _msgSender(),
            "Only token owner can set value"
        );
        _tokenForSale[tokenId] = false;
    }

    function giftToken(address receiver, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(_exists(tokenId), "request for non existent token");
        require(_msgSender() == owner, "Only owner can gift");
        _transfer(owner, receiver, tokenId);
        _tokenForSale[tokenId] = false;
    }

    function isTokenForSale(uint256 tokenId) public view returns (bool) {
        return _tokenForSale[tokenId];
    }

    function getTokenPrice(uint256 tokenId) public view returns (uint256) {
        return _tokenPrice[tokenId];
    }
}