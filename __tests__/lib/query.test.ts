import { ContractInterface } from 'ethers'
import * as apiCall from '../../src/lib/apiCall'
import query from '../../src/lib/query'

describe('query', () => {
  it('should call the contracts/query endpoint', async () => {
    const network = 'mainnet'
    const contractAddress = '0x0'
    const contractABI: ContractInterface = ''
    const functionName = 'testFunction'
    const inputValues = [1, 2, 3]

    const apiCallReturn = {
      json: { response: '123' },
      status: 200,
    }
    const spyApiCall = jest.spyOn(apiCall, 'default').mockResolvedValueOnce(apiCallReturn)

    const result = await query({ network, contractAddress, contractABI, functionName, inputValues })

    expect(spyApiCall).toBeCalledTimes(1)
    expect(spyApiCall).toBeCalledWith({
      relativePath: 'contracts/query',
      body: {
        network,
        address: contractAddress,
        abi: contractABI,
        functionName,
        inputValues,
      },
      method: 'POST',
    })
    expect(result).toEqual(apiCallReturn.json.response)
  })
})
