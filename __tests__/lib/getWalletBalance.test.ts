import * as apiCall from '../../src/lib/apiCall'
import getWalletBalance from '../../src/lib/getWalletBalance'
import * as getConfiguration from '../../src/lib/getConfiguration';
import { EthosConfiguration } from '../../src/types/EthosConfiguration';
import { Chain } from '../../src/enums/Chain';

describe('getWalletBalance', () => {
    it('should get balance for given wallet, getting config', async () => {
        const expectedBalance = '0.01'
        const apiCallReturn = {
            json: { balance: expectedBalance },
            status: 200,
        }

        const config: EthosConfiguration = {
            appId: 'app-id',
            chain: Chain.Sui,
            network: 'sui',
            walletAppUrl: 'http:localhost'
        }
        getConfiguration.default = jest.fn().mockReturnValueOnce(config)
        const spyApiCall = jest.spyOn(apiCall, 'default').mockResolvedValueOnce(apiCallReturn)

        const actualBalance = await getWalletBalance('0x123')

        expect(spyApiCall).toBeCalledTimes(1)
        expect(getConfiguration.default).toBeCalledTimes(1)
        expect(actualBalance).toEqual(expectedBalance)
    })
})
