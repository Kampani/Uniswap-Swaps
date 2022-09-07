const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

describe("SwapExamples", async function () {

  let accounts;
  let weth;
  let dai;
  let swapExamples;
  let swapExamplesContract;

  before(async() => {
      accounts = await ethers.getSigners();
      dai = await ethers.getContractAt("IERC20", DAI);
      weth = await ethers.getContractAt("IWETH", WETH9);
    
      swapExamples = await ethers.getContractFactory("singleSwapUni");
      swapExamplesContract = await swapExamples.deploy();
      await swapExamplesContract.deployed();
  });

  it("SwapExactInputSingle", async function () {
      const amountIn = 10n ** 18n;

      await weth.connect(accounts[0]).deposit({value: amountIn});
      await weth.connect(accounts[0]).approve(swapExamplesContract.address, amountIn);

      await swapExamplesContract.swapExactInputSingle(amountIn);

      console.log("DAI balance: ", await dai.balanceOf(accounts[0].address));
  });

  it("SwapExactOutputSingle", async function () {
      const amountInMaximum = 10n ** 18n;
      const amountOut = 100n * 10n ** 18n;

      await weth.connect(accounts[0]).deposit({value: amountInMaximum});
      await weth.connect(accounts[0]).approve(swapExamplesContract.address, amountInMaximum);

      await swapExamplesContract.swapExactOutputSingle(amountOut, amountInMaximum);
      
      console.log("DAI balance: ", await dai.balanceOf(accounts[0].address));
  });
});
