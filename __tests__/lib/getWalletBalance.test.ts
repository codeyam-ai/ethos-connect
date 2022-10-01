import * as getWalletContents from '../../src/lib/getWalletContents'
import getWalletBalance from '../../src/lib/getWalletBalance'
import * as getConfiguration from '../../src/lib/getConfiguration';
import { EthosConfiguration } from '../../src/types/EthosConfiguration';
import { Chain } from '../../src/enums/Chain';

describe('getWalletBalance', () => {
    it('should get balance for given wallet, getting config', async () => {
        const expectedBalance = 0.01
        const contents = { balance: expectedBalance, coins: [], nfts: [] };

        const spyApiCall = jest.spyOn(getWalletContents, 'default').mockResolvedValueOnce(contents)

        const actualBalance = await getWalletBalance('0x123')

        expect(spyApiCall).toBeCalledTimes(1)
        expect(actualBalance).toEqual(expectedBalance)
    })
})
