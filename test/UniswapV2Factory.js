const { expect } = require('chai');

describe('UniswapV2Factory', function () {
  let factory;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    const UniswapV2Factory = await ethers.getContractFactory(
      'UniswapV2Factory'
    );
    factory = await UniswapV2Factory.deploy(owner.address);
  });

  it('feeTo, feeToSetter, allPairsLength', async function () {
    console.log('owner', owner.address);
    expect(await factory.feeTo()).to.eq(
      '0x0000000000000000000000000000000000000000'
    );
    expect(await factory.feeToSetter()).to.eq(owner.address);
    expect(await factory.allPairsLength()).to.eq(0);
  });
});
