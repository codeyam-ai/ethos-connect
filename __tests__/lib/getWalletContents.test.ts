import sui from '../../__mocks__/sui.mock'
import { newBN } from '../../src/lib/bigNumber';
import getWalletContents from '../../src/lib/getWalletContents';
import { sumBN } from '../../src/lib/bigNumber';
import { WalletContents } from '../../src/types/WalletContents';

describe('getWalletBalance', () => {  
    beforeEach(() => {
        sui.getOwnedObjects.mockClear()
        sui.multiGetObjects.mockClear();
    })
    
    it('should get balance for given wallet', async () => {
        const contents = await getWalletContents({ address: '0x123', network: "TEST" })
        
        const balance = sumBN(
            sui.suiCoin.data.content.fields.balance,
            sui.suiCoin2.data.content.fields.balance
        )

        expect(sui.getOwnedObjects).toBeCalledTimes(1)
        expect(sui.multiGetObjects).toBeCalledTimes(1)
        expect(contents?.suiBalance).toEqual(balance)
        const suiTokens = contents?.tokens['0x2::sui::SUI']
        expect(suiTokens?.balance).toEqual(balance)
        expect(suiTokens?.coins.length).toEqual(2)
        expect(contents?.nfts.length).toEqual(1)
    })

    it('should not request objects that have not changed', async () => {
        const contents = await getWalletContents({ network: "test", address: '0x123', existingContents })
        
        expect(sui.getOwnedObjects).toBeCalledTimes(1)
        expect(sui.multiGetObjects).toBeCalledTimes(0)
        expect(contents).toBeNull();
    })

    it('should add and remove objects as necessary', async () => {
      sui.getOwnedObjects.mockReturnValueOnce(
        Promise.resolve({
          data: [sui.suiCoin, sui.suiCoin3].map((o: any) => ({
            data: {
              objectId: o.data.objectId,
              version: o.data.version  
            } 
          }))
        })
      )

      const contents = await getWalletContents({ network: "test", address: '0x123', existingContents })

      const totalBalance = sumBN(
        sui.suiCoin.data.content.fields.balance,
        sui.suiCoin3.data.content.fields.balance
      )
      
      expect(sui.multiGetObjects).toBeCalledWith({
        ids: ["COIN3"],
        options: {
          showContent: true,
          showDisplay: true,
          showOwner: true,
          showType: true
        }
      })
      expect(contents?.nfts.length).toBe(0)
      expect(contents?.suiBalance).toStrictEqual(totalBalance)
      expect(contents?.tokens['0x2::sui::SUI'].balance).toStrictEqual(totalBalance);
      expect(contents?.tokens['0x2::sui::SUI'].coins.length).toBe(2);  
      expect(contents?.tokens['0x2::sui::SUI'].coins[1].balance).toStrictEqual(sui.suiCoin3.data.content.fields.balance)  
    })
})

const existingContents: WalletContents = {
    suiBalance: newBN(15000),
    tokens: {
      '0x2::sui::SUI': {
        balance: 15000,
        coins: [
          {
            objectId: 'COIN1',
            type: '0x2::coin::Coin<0x2::sui::SUI>',
            balance: newBN(10000),
            digest: "DIGEST",
            version: 2
          },
          {
            objectId: 'COIN2',
            type: '0x2::coin::Coin<0x2::sui::SUI>',
            balance: newBN(5000),
            digest: "DIGEST",
            version: 6
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
        extraFields: {},
        module: "MODULE",
        links: {
          'DevNet Explorer': 'https://explorer.devnet.sui.io/objects/NFT'
        }
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
          version: 2
        }
      },
      {
        data: {
          type: '0x2::coin::Coin<0x2::sui::SUI>',
          content: {
            fields: { balance: newBN(5000) }
          },
          objectId: 'COIN2', 
          version: 6
        }
      },
      {
        data: {
          type: 'random-address',
          data: {
            fields: { url: 'IMAGE', name: 'NAME' }
          },
          objectId: 'NFT',
          version: 1 
        }
      }
    ]
  }