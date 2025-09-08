const DigitalID = artifacts.require("DigitalID");

module.exports = function(deployer) {
  deployer.deploy(DigitalID);
};
