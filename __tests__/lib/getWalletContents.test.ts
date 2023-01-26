import sui from '../../__mocks__/sui.mock'
import { newBN } from '../../src/lib/bigNumber';
import getWalletContents from '../../src/lib/getWalletContents';
import { sumBN } from '../../src/lib/bigNumber';

describe('getWalletBalance', () => {  
    beforeEach(() => {
        sui.getObjectsOwnedByAddress.mockClear()
        sui.getObjectBatch.mockClear();
    })
    
    it('should get balance for given wallet', async () => {
        const contents = await getWalletContents({ address: '0x123', network: "TEST" })
        
        const balance = sumBN(
            sui.suiCoin.details.data.fields.balance,
            sui.suiCoin2.details.data.fields.balance
        )

        expect(sui.getObjectsOwnedByAddress).toBeCalledTimes(1)
        expect(sui.getObjectBatch).toBeCalledTimes(1)
        expect(contents?.suiBalance).toEqual(balance)
        const suiTokens = contents?.tokens['0x2::sui::SUI']
        expect(suiTokens?.balance).toEqual(balance)
        expect(suiTokens?.coins.length).toEqual(2)
        expect(contents?.nfts.length).toEqual(1)
    })

    it('should not request objects that have not changed', async () => {
        const contents = await getWalletContents({ address: '0x123', existingContents })
        
        expect(sui.getObjectsOwnedByAddress).toBeCalledTimes(1)
        expect(sui.getObjectBatch).toBeCalledTimes(0)
        expect(contents).toBeNull();
    })

    it('should add and remove objects as necessary', async () => {
      sui.getObjectsOwnedByAddress.mockReturnValueOnce(
        Promise.resolve([sui.suiCoin, sui.suiCoin3].map((o: any) => ({ 
          objectId: o.details.reference.objectId,
          version: o.details.reference.version
        })))
      )

      const contents = await getWalletContents({ address: '0x123', existingContents })

      const totalBalance = sumBN(
        sui.suiCoin.details.data.fields.balance,
        sui.suiCoin3.details.data.fields.balance
      )
      
      expect(sui.getObjectBatch).toBeCalledWith(["COIN3"])
      expect(contents?.nfts.length).toBe(0)
      expect(contents?.suiBalance).toStrictEqual(totalBalance)
      expect(contents?.tokens['0x2::sui::SUI'].balance).toStrictEqual(totalBalance);
      expect(contents?.tokens['0x2::sui::SUI'].coins.length).toBe(2);  
      expect(contents?.tokens['0x2::sui::SUI'].coins[1].balance).toBe(sui.suiCoin3.details.data.fields.balance)  
  })
})

const existingContents = {
    suiBalance: newBN(15000),
    tokens: {
      '0x2::sui::SUI': {
        balance: newBN(15000),
        coins: [
          {
            objectId: 'COIN1',
            type: '0x2::coin::Coin<0x2::sui::SUI>',
            balance: newBN(10000)
          },
          {
            objectId: 'COIN2',
            type: '0x2::coin::Coin<0x2::sui::SUI>',
            balance: newBN(5000)
          }
        ]
      }
    },
    nfts: [
      {
        type: 'random-address',
        package: 'random-address',
        chain: 'Sui',
        address: 'NFT',
        objectId: 'NFT',
        name: 'NAME',
        description: undefined,
        imageUri: 'IMAGE',
        previewUri: 'IMAGE',
        thumbnailUri: 'IMAGE',
        extraFields: {},
        module: undefined,
        links: {
          'DevNet Explorer': 'https://explorer.devnet.sui.io/objects/NFT'
        }
      }
    ],
    objects: [
      {
        details: {
          data: {
            type: '0x2::coin::Coin<0x2::sui::SUI>',
            fields: { balance: newBN(10000) }
          },
          reference: { objectId: 'COIN1', version: 2 }
        }
      },
      {
        details: {
          data: {
            type: '0x2::coin::Coin<0x2::sui::SUI>',
            fields: { balance: newBN(5000) }
          },
          reference: { objectId: 'COIN2', version: 6 }
        }
      },
      {
        details: {
          data: {
            type: 'random-address',
            fields: { url: 'IMAGE', name: 'NAME' }
          },
          reference: { objectId: 'NFT', version: 1 }
        }
      }
    ]
  }