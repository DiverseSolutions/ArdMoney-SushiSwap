const chai = require('chai');
const { expect } = require('chai');
const { getAddress, keccak256, defaultAbiCoder, toUtf8Bytes, solidityPack } =
  require('ethers').utils;
const eth = require('ethers');
const {
  MockProvider,
  solidity,
  createFixtureLoader,
  deployContract,
} = require('ethereum-waffle');
const { waffle } = require("hardhat");
const provider = waffle.provider;


const UniswapV2Pair = require('../artifacts/contracts/uniswapv2/UniswapV2Factory.sol/UniswapV2Factory.json');
const UniswapV2Factory = require('../artifacts/contracts/uniswapv2/UniswapV2Factory.sol/UniswapV2Factory.json');

chai.use(solidity);

const TEST_ADDRESSES = [
  '0x1000000000000000000000000000000000000000',
  '0x2000000000000000000000000000000000000000',
];

const overrides = {
  gasLimit: 9999999,
};

function getCreate2Address(factoryAddress, [tokenA, tokenB], bytecode) {
  const [token0, token1] =
    tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];
  const create2Inputs = [
    '0xff',
    factoryAddress,
    keccak256(solidityPack(['address', 'address'], [token0, token1])),
    keccak256(bytecode),
  ];
  const sanitizedInputs = `0x${create2Inputs.map((i) => i.slice(2)).join('')}`;
  return getAddress(`0x${keccak256(sanitizedInputs).slice(-40)}`);
}

async function factoryFixture(_, [wallet]) {
  const factory = await deployContract(
    wallet,
    UniswapV2Factory,
    [wallet.address],
    overrides
  );
  return { factory };
}

describe('UniswapV2Factory', function () {
  // const provider = new MockProvider({
  //   ganacheOptions: {
  //     hardfork: 'istanbul',
  //     mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
  //     gasLimit: 9999999,
  //   },
  // });
  const [wallet, other] = provider.getWallets();
  const loadFixture = createFixtureLoader(provider, [wallet, other]);

  let factory;
  beforeEach(async () => {
    const fixture = await loadFixture(factoryFixture);
    factory = fixture.factory;
  });

  // beforeEach(async function () {
  //   [owner] = await ethers.getSigners();

  //   const UniswapV2Factory = await ethers.getContractFactory(
  //     'UniswapV2Factory'
  //   );
  //   factory = await UniswapV2Factory.deploy(owner.address);
  // });
  it('feeTo, feeToSetter, allPairsLength', async () => {
    expect(await factory.feeTo()).to.eq(
      '0x0000000000000000000000000000000000000000'
    );
    expect(await factory.feeToSetter()).to.eq(wallet.address);
    expect(await factory.allPairsLength()).to.eq(0);
  });

  async function createPair(tokens) {
    const bytecode = `${UniswapV2Pair.bytecode}`;
    const create2Address = getCreate2Address(factory.address, tokens, bytecode);

    await expect(factory.createPair(...tokens))
      .to.emit(factory, 'PairCreated')
      .withArgs(
        TEST_ADDRESSES[0],
        TEST_ADDRESSES[1],
        create2Address,
        eth.BigNumber.from(1)
      );

    await expect(factory.createPair(...tokens)).to.be.reverted; // UniswapV2: PAIR_EXISTS
    await expect(factory.createPair(...tokens.slice().reverse())).to.be
      .reverted; // UniswapV2: PAIR_EXISTS
    expect(await factory.getPair(...tokens)).to.eq(create2Address);
    expect(await factory.getPair(...tokens.slice().reverse())).to.eq(
      create2Address
    );

    expect(await factory.allPairs(0)).to.eq(create2Address);
    expect(await factory.allPairsLength()).to.eq(1);

    const pair = new Contract(
      create2Address,
      JSON.stringify(UniswapV2Pair.abi),
      provider
    );
    expect(await pair.factory()).to.eq(factory.address);
    expect(await pair.token0()).to.eq(TEST_ADDRESSES[0]);
    expect(await pair.token1()).to.eq(TEST_ADDRESSES[1]);
  }

  it('createPair', async () => {
    await createPair(TEST_ADDRESSES);
  });
});
