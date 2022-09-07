require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.7.6",
  networks : {
    hardhat : {
      forking : {
        url : "https://eth-mainnet.g.alchemy.com/v2/_ydDh_4VQ9-z8-vL0BQUB4icrjk-cJPB",
      },
    },
  },
};
