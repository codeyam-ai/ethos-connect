globalThis.IS_REACT_ACT_ENVIRONMENT = true

import * as getConfiguration from './src/lib/getConfiguration'

beforeEach(() => {
  jest.spyOn(getConfiguration, 'default').mockImplementation(() => ({
    walletAppUrl: 'test',
    appId: 'test',
    network: 'test',
    chain: 'test',
  }))
})

jest.mock('@mysten/sui.js', () => ({
  JsonRpcProvider: function () {
  }
}));
