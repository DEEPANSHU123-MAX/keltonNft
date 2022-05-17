const NFT = artifacts.require("NFT");

let _commissionPercentage = 100;


module.exports = function (deployer , accounts) {
  deployer.deploy(NFT,"testURI","Krypto Cat","KC" , commissionPercentage ,accounts[0]);
};