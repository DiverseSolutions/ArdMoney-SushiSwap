const { expect } = require("chai");
const { ethers } = require("hardhat");
const { 
  initializeDummyTokens,
  initializeArdMoneyContracts,
  approveToken,
  tokenMint,
} = require('./helpers.js');

describe("ArdMoney Create Pool", function () {

  it("Create Dynamic Pool", async function () {
    const [owner,odko,amaraa,feeSetter,routerAdmin] = await ethers.getSigners();

    // 100% == 1000 || 3% == 30 || 0.3% == 3
    let swapFee = 3;
    let mintFee = 3;

    let [ factory,router,weth ] = await initializeArdMoneyContracts( feeSetter.address, routerAdmin.address, swapFee, mintFee)
    let [ tokenA,tokenB ] = await initializeDummyTokens()

    await tokenMint(tokenA,'1000',odko.address,owner)
    await tokenMint(tokenB,'1000',odko.address,owner)

    // Create Liquidity
    await approveToken(router,tokenA,'100',odko)
    await approveToken(router,tokenB,'100',odko)

    await router.connect(odko).addLiquidity(
      tokenA.address,
      tokenB.address,
      ethers.utils.parseUnits('100',18),
      ethers.utils.parseUnits('100',18),
      1,
      1,
      odko.address,
      2648035579
    )

  });

});

