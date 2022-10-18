import * as fetchSui from '../../src/lib/fetchSui';

import getWalletContents from '../../src/lib/getWalletContents';

describe('getWalletBalance', () => {
    const fetchSpy = jest.spyOn(fetchSui, 'default')

    const nft = {
        name: 'example',
        tokenId: 0,
        imageUri: 'example.com/0',
        chain: 'sui',
        collection: {
            name: 'example collection',
        },
    }

    const coin = {
        details: {
            data: {
                type: '0x2::coin::Coin<0x2::sui::SUI>',
                fields: {
                    balance: 10000
                }
            }
        }
    }

    afterEach(() => {
        fetchSpy.mockReset()
    });

    it('should get balance for given wallet, getting config', async () => {
        const expectedContents = { 
            suiBalance: 10000,
            tokens: { 
                sui: { 
                    balance: 10000,
                    coins: [coin], 
                }, 
            },
            nfts: [nft]
        };

        fetchSpy.mockReturnValue(Promise.resolve([coin, nft]));
        const contents = await getWalletContents('0x123')
        
        expect(fetchSpy).toBeCalledTimes(1)
        expect(contents).toEqual(expectedContents)
    })
})
