import { expect } from "chai";
import { waffle } from "hardhat";
const { deployContract } = waffle;

describe("UniswapV2Factory", () => {
  const provider = waffle.provider;
  const [wallet, other] = provider.getWallets();

  const loadFixture = waffle.createFixtureLoader([wallet, other], provider);

  console.log(loadFixture)
});
