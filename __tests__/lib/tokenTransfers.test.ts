import { TokenTransferInformation } from '../../src/types/TokenTransferInformation'
import * as apiCall from '../../src/lib/apiCall'
import tokenTransfers from '../../src/lib/tokenTransfers'

describe('tokenTransfers', () => {
  it('should call the contracts/transfers endpoint', async () => {
    const network = 'mainnet'
    const walletAddress = '0x0'
    const contractAddress = '0x1'
    const contractABI = ''

    const transferInfo: TokenTransferInformation = {
      orderedTransfers: [],
      currentTokenIds: ['1', '2'],
    }

    const apiCallReturn = {
      json: { transferInformation: transferInfo },
      status: 200,
    }
    const spyApiCall = jest.spyOn(apiCall, 'default').mockResolvedValueOnce(apiCallReturn)

    const result = await tokenTransfers({ network, walletAddress, contractAddress, contractABI })

    expect(spyApiCall).toBeCalledTimes(1)
    expect(spyApiCall).toBeCalledWith({
      relativePath: 'contracts/transfers',
      body: {
        network,
        walletAddress,
        contractAddress,
        contractABI,
      },
      method: 'POST',
    })
    expect(result).toEqual(apiCallReturn.json.transferInformation)
  })
})
