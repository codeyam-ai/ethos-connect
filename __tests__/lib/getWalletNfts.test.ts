import * as apiCall from '../../src/lib/apiCall'
import * as getConfiguration from '../../src/lib/getConfiguration';
import { EthosConfiguration } from '../../src/types/EthosConfiguration';
import { Chain } from '../../src/enums/Chain';
import getWalletNfts from '../../src/lib/getWalletNfts';
import { NFT } from '../../src/types/NFT';

describe('getWalletNfts', () => {
    const spyApiCall = jest.spyOn(apiCall, 'default')

    beforeEach(() => {
        const config: EthosConfiguration = {
            appId: 'app-id',
            chain: Chain.Sui,
            network: 'sui',
            walletAppUrl: 'http:localhost'
        }
        // @ts-ignore
        getConfiguration.default = jest.fn().mockReturnValueOnce(config)
    });

    afterEach(() => {
        spyApiCall.mockReset()
    });

    it('should get NFTs for given wallet, getting config', async () => {
        const expectedNfts: NFT[] = [
            {
                name: 'example',
                tokenId: 0,
                imageUri: 'example.com/0',
                chain: 'sui',
                collection: {
                    name: 'example collection',
                },
            },
        ]
        const apiCallReturn = {
            json: { nfts: expectedNfts },
            status: 200,
        }

        spyApiCall.mockResolvedValueOnce(apiCallReturn)

        const actualNfts = await getWalletNfts('0x123')

        expect(spyApiCall).toBeCalledTimes(1)
        expect(getConfiguration.default).toBeCalledTimes(1)
        expect(actualNfts).toEqual(expectedNfts)
    })

    it('should return an empty list if there is an error', async () => {
        const apiCallReturn = {
            json: {},
            status: 500,
        }

        spyApiCall.mockResolvedValueOnce(apiCallReturn)

        const returnedNfts = await getWalletNfts('0x123')

        expect(spyApiCall).toBeCalledTimes(1)
        expect(getConfiguration.default).toBeCalledTimes(1)
        expect(returnedNfts).toEqual([])
    })
})
