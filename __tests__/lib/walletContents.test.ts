import { Chain } from '../../src/enums/Chain'
import { NFT } from '../../src/types/NFT'
import * as apiCall from '../../src/lib/apiCall'
import getWalletNfts from '../../src/lib/getWalletNfts'

describe('getWalletNfts', () => {
  it('should call the nfts/[address] endpoint', async () => {
    const walletAddress = '0x0'

    const returnedNfts: NFT[] = [
      {
        name: 'example',
        tokenId: 0,
        imageUri: 'example.com/0',
        collection: {
          name: 'example collection',
        },
      },
    ]

    const apiCallReturn = {
      json: { nfts: returnedNfts },
      status: 200,
    }
    const spyApiCall = jest.spyOn(apiCall, 'default').mockResolvedValueOnce(apiCallReturn)

    const result = await getWalletNfts(walletAddress, Chain.Eth)

    expect(spyApiCall).toBeCalledTimes(1)
    expect(spyApiCall).toBeCalledWith({ relativePath: `nfts/${walletAddress}?chain=${Chain.Eth}` })
    expect(result).toEqual(returnedNfts)
  })
})
