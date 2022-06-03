import { ContractInterface } from 'ethers';
import * as apiCall from '../apiCall';
import query from '../query';

describe('query', () => {
  it('should call the contracts/query endpoint', async () => {
    const network = 'mainnet';
    const address = '0x0';
    const abi: ContractInterface = '';
    const functionName = 'testFunction';
    const inputValues = [1, 2, 3];
    const host = 'localhost:3000';

    const apiCallReturn = {
      json: { response: '123' },
      status: 200,
    };
    const spyApiCall = jest.spyOn(apiCall, 'default').mockResolvedValueOnce(apiCallReturn);

    const result = await query({ network, address, abi, functionName, inputValues, host });

    expect(spyApiCall).toBeCalledTimes(1);
    expect(spyApiCall).toBeCalledWith({
      relativePath: 'contracts/query',
      body: {
        network,
        address,
        abi,
        functionName,
        inputValues
      },
      method: 'POST',
      host
    });
    expect(result).toEqual(apiCallReturn.json.response);
  });
});
