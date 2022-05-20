const NFT = artifacts.require("NFT");


let _commission =10;

module.exports = function (deployer , accounts) {
  // console.log(accounts ,"accocmscsocom")
  deployer.deploy(NFT,"testURI","Krypto Cat","KC" ,_commission , "0x4049f50Bb416D45b75Bd0c88CDE8E7FA62c7C316" );
};