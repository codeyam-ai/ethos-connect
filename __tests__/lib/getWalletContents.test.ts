import sui from '../../__mocks__/sui.mock'
import { newBN } from '../../src/lib/bigNumber';
import getWalletContents from '../../src/lib/getWalletContents';
import { sumBN } from '../../src/lib/bigNumber';
import { WalletContents } from '../../src/types/WalletContents';
import { CoinBalance } from '@mysten/sui.js';

describe('getWalletBalance', () => {  
    beforeEach(() => {
        sui.getOwnedObjects.mockClear()
        sui.multiGetObjects.mockClear();
    })
    
    it('should get balance for given wallet', async () => {
        const contents = await getWalletContents({ address: '0x123', network: "TEST" })
        
        const balance = sumBN(
            sui.suiCoin.data.content.fields.balance,
            sui.suiCoin3.data.content.fields.balance
        )

        expect(sui.getOwnedObjects).toBeCalledTimes(1)
        expect(contents?.suiBalance).toEqual(balance)
        const suiTokens = contents?.tokens['0x2::sui::SUI']
        expect(suiTokens?.balance).toEqual(balance)
        expect(suiTokens?.coins.length).toEqual(2)
        expect(contents?.nfts.length).toEqual(1)
    })

    // This test is in flux while performance issues are investigated
    it('should not request objects that have not changed', async () => {
        const contents = await getWalletContents({ network: "test", address: '0x123', existingContents })
        
        expect(sui.getOwnedObjects).toBeCalledTimes(1)
        expect(contents).toBeNull();
    })

    it('should add and remove objects as necessary', async () => {
      sui.getOwnedObjects.mockReturnValueOnce(
        Promise.resolve({
          data: [sui.suiCoin, sui.suiCoin2].map((o: any) => (o))
        })
      )
      sui.getAllBalances.mockReturnValueOnce(
        [{
          coinType: '0x2::sui::SUI',
          totalBalance: [sui.suiCoin, sui.suiCoin2].reduce(
              (acc, c) => sumBN(acc, c.data.content.fields.balance), 
              newBN(0)
          ).toString(),
        }]
      )

      const contents = await getWalletContents({ network: "test", address: '0x123', existingContents })

      const totalBalance = sumBN(
        sui.suiCoin.data.content.fields.balance,
        sui.suiCoin2.data.content.fields.balance
      )

      expect(contents?.nfts.length).toBe(0)
      expect(contents?.suiBalance).toStrictEqual(totalBalance)
      expect(contents?.tokens['0x2::sui::SUI'].balance).toStrictEqual(totalBalance);
      expect(contents?.tokens['0x2::sui::SUI'].coins.length).toBe(2);  
      expect(contents?.tokens['0x2::sui::SUI'].coins[1].balance).toStrictEqual(sui.suiCoin2.data.content.fields.balance)  
    })
})

const existingContents: WalletContents = {
  suiBalance: newBN(60000),
  balances: {
    '0x2::sui::SUI': { coinType: '0x2::sui::SUI', totalBalance: '60000' } as CoinBalance
  },
  tokens: {
    '0x2::sui::SUI': {
      balance: newBN(60000),
      coins: [
        {
          objectId: 'COIN1',
          type: '0x2::coin::Coin<0x2::sui::SUI>',
          balance: newBN(10000),
          digest: 'COIN1',
          version: 2,
          display: undefined
        },
        {
          objectId: 'COIN3',
          type: '0x2::coin::Coin<0x2::sui::SUI>',
          balance: newBN(50000),
          digest: 'COIN3',
          version: 36,
          display: undefined
        }
      ]
    }
  },
  nfts: [
    {
      type: 'PACKAGE::MODULE::NFT',
      package: 'PACKAGE',
      chain: 'Sui',
      address: 'NFT',
      objectId: 'NFT',
      name: 'NAME',
      description: undefined,
      imageUri: 'IMAGE',
      link: undefined,
      creator: undefined,
      projectUrl: undefined,
      display: undefined,
      extraFields: {},
      module: 'MODULE',
      links: { Explorer: 'https://explorer.sui.io/objects/undefined' }
    }
  ],
  objects: [
    {
      data: {
        type: '0x2::coin::Coin<0x2::sui::SUI>',
        content: {
          fields: { balance: newBN(10000) }
        },
        objectId: 'COIN1',
        version: 2,
        digest: 'COIN1'
      },
      type: '0x2::coin::Coin<0x2::sui::SUI>',
      version: 2,
      objectId: 'COIN1',
      name: undefined,
      description: undefined,
      display: undefined,
      extraFields: { balance: newBN(10000) }
    },
    {
      data: {
        type: '0x2::coin::Coin<0x2::sui::SUI>',
        content: {
          fields: { balance: newBN(50000) }
        },
        objectId: 'COIN3',
        version: 36,
        digest: 'COIN3'
      },
      type: '0x2::coin::Coin<0x2::sui::SUI>',
      version: 36,
      objectId: 'COIN3',
      name: undefined,
      description: undefined,
      display: undefined,
      extraFields: { balance: newBN(50000) }
    },
    {
      data: {
        type: 'PACKAGE::MODULE::NFT',
        content: { fields: { url: 'IMAGE', name: 'NAME' } },
        objectId: 'NFT',
        version: 1,
        digest: 'NFT'
      },
      type: 'PACKAGE::MODULE::NFT',
      version: 1,
      objectId: 'NFT',
      name: 'NAME',
      description: undefined,
      display: undefined,
      extraFields: { url: 'IMAGE' }
    }
  ],
  hasNextPage: undefined,
  nextCursor: undefined
}