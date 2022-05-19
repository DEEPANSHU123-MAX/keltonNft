// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/common/ERC2981.sol";

// contract NFT is Ownable, ERC721URIStorage , ERC2981 
// {
//     using Counters for Counters.Counter;
//     using Strings for uint256;

//     string private baseURI;
//     string private baseExtension = ".json";
//     address minter;
//     mapping(uint256 => bool) private _tokenForSale;
//     mapping(uint256 => uint256) private _tokenPrice;

//     Counters.Counter private _tokenIds;
//     mapping(string => bool) private _tokenExists;
//     uint256[] private totalTokens;



//      struct NFT {
//         uint256 tokenId;
//         address seller;
//         address buyer;
//         uint256 saleAmount;
       
//     }

//     constructor(
//         string memory _initBaseURI,
//         string memory tokenName,
//         string memory tokenSymbol,zzzzz
//     ) ERC721(tokenName, tokenSymbol) {
//         setBaseURI(_initBaseURI);
        
//     }

//     function mint(string memory _tokenURI, string memory _setBaseURI ,uint96 royaltyperct ,address royaltypay)
//         public
//         returns (uint256)
//     {
//         _tokenIds.increment();
//         royaltyperct = royaltyperct*100;
//         uint256 newItemId = _tokenIds.current();
//         totalTokens.push(newItemId);
//         _mint(_msgSender(), newItemId);
//         _tokenForSale[newItemId] = false;
//         setBaseURI(_setBaseURI);
//         _setTokenURI(newItemId, _tokenURI);
//         setRoyaltyInfo(newItemId, royaltypay , royaltyperct) ;
//          minter = _msgSender();
//         return newItemId;

//     }

//     // function mintInBatch(uint256 noOfTokens) public {
//     //     for (uint256 i = 0; i < noOfTokens; i++) {
//     //         mint();
//     //     }
//     // }

//  function setRoyaltyInfo(uint tokenId , address _receiver, uint96 _royaltyFee) public  {
//         _setTokenRoyalty(tokenId , _receiver, _royaltyFee);
//     }

//     function setBaseURI(string memory _newBaseURI) internal {
//         baseURI = _newBaseURI;
//     }

//     function _baseURI() internal view virtual override returns (string memory) {
//         return baseURI;
//     }

//     function setTokenForSale(uint256 tokenId, uint256 price ) public {
        
//         require(_exists(tokenId), "Token does not exist!");
//         require(
//             ownerOf(tokenId) == _msgSender(),
//             "Only owner can set a token for sale!"
//         );
//         _tokenForSale[tokenId] = true;
//         _tokenPrice[tokenId] = price;
        
        
//     }
    

//     function changeTokenPrice(uint256 tokenId, uint256 price) public {
//         require(_exists(tokenId), "Token does not exist!");
//         require(
//             _tokenForSale[tokenId],
//             "Token is not for sale, set it sale first!"
//         );
//         require(
//             ownerOf(tokenId) == _msgSender(),
//             "Only owner can set the value!"
//         );
//         _tokenPrice[tokenId] = price;
//     }

//     function buyNFT(uint256 tokenId ) public payable {
//         require(_tokenForSale[tokenId], "Token is currently not for sale!");
//         address owner = ownerOf(tokenId);
//         require(_msgSender()!= address(0), "Buyer address cannot be zero");
//         require(_msgSender() != owner, "Cannot buy owned NFT");
//         uint256 userBalance = msg.value;
//         uint256 tokenPrice = getTokenPrice(tokenId);
//         uint256 royaltyAmount;
//         address payee;
//         require(userBalance > tokenPrice, "You dont have enough cash");
//         payable(owner).transfer(msg.value);
//         _transfer(owner, _msgSender(), tokenId);
//         _tokenForSale[tokenId] = false;

//         NFT memory _data = NFT(
//             tokenId,
//             owner,
//             _msgSender(),
//             tokenPrice,
//             address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2),
//             0
//         );

//         if(minter != owner)
//         {
//             (payee, royaltyAmount) = royaltyInfo(tokenId,tokenPrice);
            
//             if (royaltyAmount > 0) {
//             payable(payee).transfer(royaltyAmount);
//         }
//     }
//     }
//     function removeTokenFromSale(uint256 tokenId) public {
//         require(_exists(tokenId), "Token does not exist");
//         require(_tokenForSale[tokenId], "Token is already set to not for sale");
//         require(
//             ownerOf(tokenId) == _msgSender(),
//             "Only token owner can set value"
//         );
//         _tokenForSale[tokenId] = false;
//     }

//     function giftToken(address receiver, uint256 tokenId) public {
//         address owner = ownerOf(tokenId);
//         require(_exists(tokenId), "request for non existent token");
//         require(_msgSender() == owner, "Only owner can gift");
//         _transfer(owner, receiver, tokenId);
//         _tokenForSale[tokenId] = false;
//     }

//     function isTokenForSale(uint256 tokenId) public view returns (bool) {
//         return _tokenForSale[tokenId];
//     }

//     function getTokenPrice(uint256 tokenId) public view returns (uint256) {
//         return _tokenPrice[tokenId];
//     }
//      function supportsInterface(bytes4 interfaceId)
//         public
//         view
//         override(ERC721, ERC2981)
//         returns (bool)
//     {
//         return super.supportsInterface(interfaceId);
//     }

// }