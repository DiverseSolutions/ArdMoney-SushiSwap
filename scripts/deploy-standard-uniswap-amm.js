const path = require('path');
const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const wrappedETH = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa"

  const Factory = await hre.ethers.getContractFactory("StandardUniswapV2Factory");
  const factoryContract = await Factory.deploy(owner.address);

  const Router = await hre.ethers.getContractFactory("StandardUniswapV2Router02");
  const routerContract = await Router.deploy(factoryContract.address,wrappedETH);

  await factoryContract.deployed();
  await routerContract.deployed();

  console.log("factoryContract deployed to:", factoryContract.address);
  console.log("routerContract deployed to:", routerContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


