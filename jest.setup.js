globalThis.IS_REACT_ACT_ENVIRONMENT = true

import * as lib from './src/lib'; 
import sui from './__tests__/mocks/sui.mock'
const { getObjectsOwnedByAddress, getObjectBatch } = sui;

jest.mock('./src/lib', () => {
    return {
        __esModule: true,
        ...jest.requireActual('./src/lib')
    };
});

beforeEach(() => {
    jest.spyOn(lib, 'getConfiguration').mockImplementation(() => ({
        walletAppUrl: 'test',
        appId: 'test',
        network: 'test',
        chain: 'test',
    }))
})

jest.mock('@mysten/sui.js', () => ({
    JsonRpcProvider: function () {
        return {
            getObjectsOwnedByAddress,
            getObjectBatch
        }
    } 
}));
