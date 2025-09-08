// const { ethers } = require("ethers");
// const fs = require("fs");
// const path = require("path");
//
// const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
//
// const signer = provider.getSigner(0);
//
// const contractPath = "../../blockchain/build/contracts/DigitalID.json";
// const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));
//
// const abi = contractJson.abi;
// const address = contractJson.networks["5777"]?.address || contractJson.address;
//
// const digitalIDContract = new ethers.Contract(address, abi, signer);
//
// module.exports = digitalIDContract;
