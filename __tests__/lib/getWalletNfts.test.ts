import * as getWalletContents from '../../src/lib/getWalletContents'
import * as getConfiguration from '../../src/lib/getConfiguration';
import getWalletNfts from '../../src/lib/getWalletNfts';
import { NFT } from '../../src/types/NFT';

describe('getWalletNfts', () => {
    const spyApiCall = jest.spyOn(getWalletContents, 'default')

    afterEach(() => {
        spyApiCall.mockReset()
    });

    it('should get NFTs for given wallet, getting config', async () => {
        const expectedNfts: NFT[] = [
            ,
        ]
        
        spyApiCall.mockResolvedValueOnce({ balance: 0, coins: [], nfts: expectedNfts })

        const actualNfts = await getWalletNfts('0x123')

        expect(spyApiCall).toBeCalledTimes(1)
        expect(actualNfts).toEqual(expectedNfts)
    })
})
