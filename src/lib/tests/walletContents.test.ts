import { Chain } from '../../enums/Chain'
import { NFT } from '../../types/NFT'
import * as apiCall from '../apiCall'
import walletContents from '../walletContents'

describe('walletContents', () => {
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

    const result = await walletContents(walletAddress, Chain.Eth)

    expect(spyApiCall).toBeCalledTimes(1)
    expect(spyApiCall).toBeCalledWith({ relativePath: `nfts/${walletAddress}?chain=${Chain.Eth}` })
    expect(result).toEqual(returnedNfts)
  })
})
