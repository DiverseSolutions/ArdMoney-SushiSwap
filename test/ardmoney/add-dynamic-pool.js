const { expect } = require("chai");
const { ethers } = require("hardhat");
const { 
  initializeDummyTokens,
  initializeArdMoneyContracts,
  approveToken,
  tokenMint,
} = require('./helpers.js');

describe("ArdMoney Add Pool", function () {
  let owner,odko,amaraa,feeSetter,routerAdmin;
  let factory,router,weth;
  let tokenA,tokenB;

  // 100% == 1000 || 3% == 30 || 0.3% == 3
  let swapFee;
  let mintFee;

  this.beforeEach(async function (){
    [owner,odko,amaraa,feeSetter,routerAdmin,pairAdmin] = await ethers.getSigners();

    swapFee = 3;
    mintFee = 3;

    [ factory,router,weth ] = await initializeArdMoneyContracts( feeSetter.address, routerAdmin.address, swapFee, mintFee);
    [ tokenA,tokenB ] = await initializeDummyTokens();

    await tokenMint(tokenA,'1000',odko.address,owner)
    await tokenMint(tokenB,'1000',odko.address,owner)

    await factory.connect(feeSetter).createPair(
      tokenA.address,
      tokenB.address,
      mintFee,
      swapFee,
      pairAdmin.address
    )

  })


  it("Add Dynamic Pool", async function () {
    await approveToken(router,tokenA,'200',odko)
    await approveToken(router,tokenB,'200',odko)

    await router.connect(odko).addLiquidity(
      tokenA.address,
      tokenB.address,
      ethers.utils.parseUnits('200',18),
      ethers.utils.parseUnits('200',18),
      1,
      1,
      odko.address,
      2648035579
    )
  });

});

