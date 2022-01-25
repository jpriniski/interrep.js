require('dotenv').config()
const { TruffleProvider } = require('@harmony-js/core')

module.exports = {
  networks: {
    testnet: {
      network_id: '2',
      provider: () => {
        const truffleProvider = new TruffleProvider(
          process.env.TESTNET_URL,
          { },
          { shardID: 0, chainId: 2 },
          { gasLimit: process.env.GAS_LIMIT, gasPrice: process.env.GAS_PRICE},
        );
        const newAcc = truffleProvider.addByPrivateKey(process.env.TESTNET_PRIVATE_KEY);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      },
    },
    mainnet: {
      network_id: '1',
      provider: () => {
        const truffleProvider = new TruffleProvider(
          process.env.MAINNET_URL,
          { },
          { shardID: 0, chainId: 1 },
          { gasLimit: process.env.GAS_LIMIT, gasPrice: process.env.GAS_PRICE },
        );
        const newAcc = truffleProvider.addByPrivateKey(process.env.MAINNET_PRIVATE_KEY);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      },
    }
  },

  ...
};