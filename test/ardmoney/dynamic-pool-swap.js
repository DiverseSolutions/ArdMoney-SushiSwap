const { expect } = require("chai");
const { ethers } = require("hardhat");
const { 
  initializeDummyTokens,
  initializeArdMoneyContracts,
  approveToken,
  tokenMint,
} = require('./helpers.js');

describe("ArdMoney Swap Dynamic Pool", function () {

  it("Swap Dynamic Pool", async function () {
    const [owner,odko,amaraa,feeSetter,routerAdmin] = await ethers.getSigners();

    // 100% == 1000 || 3% == 30 || 0.3% == 3
    let swapFee = 3;
    let mintFee = 3;

    let fakeDeadline = 2648035579

    let [ factory,router,weth ] = await initializeArdMoneyContracts( feeSetter.address, routerAdmin.address, swapFee, mintFee)
    let [ tokenA,tokenB ] = await initializeDummyTokens()

    await tokenMint(tokenA,'5000',odko.address,owner)
    await tokenMint(tokenB,'5000',odko.address,owner)

    // Create Liquidity
    await approveToken(router,tokenA,'500',odko)
    await approveToken(router,tokenB,'500',odko)

    await router.connect(odko).addLiquidity(
      tokenA.address,
      tokenB.address,
      ethers.utils.parseUnits('500',18),
      ethers.utils.parseUnits('500',18),
      1,
      1,
      odko.address,
      fakeDeadline
    )

    await tokenMint(tokenA,'2000',amaraa.address,owner)

    await approveToken(router,tokenA,'100',amaraa)
    let amountInWei = ethers.utils.parseEther('100',18)
    let path = [tokenA.address,tokenB.address]

    let [,amountsOutWei] = await router.getAmountsOut(amountInWei,path)

    await router.connect(amaraa).swapExactTokensForTokens(
      amountInWei,
      1,
      path,
      amaraa.address,
      fakeDeadline
    )

    let amaraaBalance = await tokenB.balanceOf(amaraa.address)
    console.log(amaraaBalance)
    console.log(amountsOutWei)
    expect(amaraaBalance).to.equal(amountsOutWei);


  });

});


