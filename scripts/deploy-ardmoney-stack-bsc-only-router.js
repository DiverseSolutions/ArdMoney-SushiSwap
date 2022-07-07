const path = require('path');
const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const wrappedBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  const factoryAddress = "0xebBf47C12f2081F96bd86aCd069d241FEcD7D1f3"
  // 100% == 1000 || 3% == 30 || 0.3% == 3
  const swapFee = 3
  const mintFee = 5;

  const Router = await hre.ethers.getContractFactory("ArdMoneyRouter");
  const routerContract = await Router.deploy(factoryAddress,wrappedBNB,owner.address,swapFee,mintFee);

  await routerContract.deployed();
  console.log("routerContract deployed to:", routerContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


