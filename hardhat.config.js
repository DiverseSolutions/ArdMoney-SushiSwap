require('@nomiclabs/hardhat-waffle');
require('dotenv/config');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'mumbai',
  networks: {
    hardhat: {},
    ganache: {
      url: "http://127.0.0.1:7545",
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};
