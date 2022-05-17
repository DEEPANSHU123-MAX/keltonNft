const NFT = artifacts.require("NFT");




module.exports = function (deployer , accounts) {
  deployer.deploy(NFT,"testURI","Krypto Cat","KC" );
};