import sui from '../mocks/sui.mock'
import getWalletContents from '../../src/lib/getWalletContents';

describe('getWalletBalance', () => {   
    it('should get balance for given wallet, getting config', async () => {
        const contents = await getWalletContents('0x123')
        
        expect(sui.getObjectsOwnedByAddress).toBeCalledTimes(1)
        expect(contents.suiBalance).toEqual(sui.coin.details.data.fields.balance)
        const suiTokens = contents.tokens['0x2::sui::SUI']
        expect(suiTokens.balance).toEqual(sui.coin.details.data.fields.balance)
        expect(suiTokens.coins.length).toEqual(1)
        expect(contents.nfts.length).toEqual(1)
    })
})
