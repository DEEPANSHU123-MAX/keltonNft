const MYNFT = artifacts.require("NFT");

module.exports = function (deployer) {
  deployer.deploy(MYNFT,"testURI","Krypto Cat","KC");
};