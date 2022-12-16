globalThis.IS_REACT_ACT_ENVIRONMENT = true

import { TextEncoder, TextDecoder } from 'util'
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

import sui from './__mocks__/sui.mock'

jest.mock('./src/lib/lib', () => {
    return {
        __esModule: true,
        ...jest.requireActual('./src/lib/lib')
    };
});

jest.mock('./src/lib/getConfiguration', () => ({
    __esModule: true,
    default: () => ({
        walletAppUrl: 'test',
        apiKey: 'test',
        network: 'test',
        chain: 'test',
    })
}));

jest.mock('@mysten/sui.js', () => ({
    Network: {
      DEVNET: ""
    },
    JsonRpcProvider: function () {
        return sui.provider
    } 
}));
