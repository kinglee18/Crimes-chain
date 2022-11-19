import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_API_KEY,
      accounts: [process.env.PRIVATE_KEY],
      allowUnlimitedContractSize: true,
      gas: 2100000,
      gasPrice: 8000000000,
      blockGasLimit: 100000000429720,
    },
  }
};

export default config;
