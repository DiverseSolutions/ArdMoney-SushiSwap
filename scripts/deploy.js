async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const UniswapV2Factory = await ethers.getContractFactory('UniswapV2Factory');
  const UniswapV2Router02 = await ethers.getContractFactory(
    'UniswapV2Router02'
  );
  const WMATIC_ADDRESS = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';

  const factoryContract = await UniswapV2Factory.deploy(deployer.address);
  console.log('UniswapV2Factory deployed address:', factoryContract.address);
  const routerContract = await UniswapV2Router02.deploy(
    factoryContract.address,
    WMATIC_ADDRESS
  );
  console.log('UniswapV2Router02 deployed address:', routerContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
