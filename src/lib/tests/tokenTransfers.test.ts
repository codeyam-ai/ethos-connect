import { ContractInterface } from 'ethers';
import { TokenTransferInformation } from '../../types/TokenTransferInformation';
import * as apiCall from '../apiCall';
import tokenTransfers from '../tokenTransfers';

describe('tokenTransfers', () => {
  it('should call the contracts/transfers endpoint', async () => {
    const network = 'mainnet';
    const walletAddress = '0x0';
    const contractAddress = '0x1';
    const contractABI: ContractInterface = '';
    const host = 'localhost:3000';

    const transferInfo: TokenTransferInformation = {
      orderedTransfers: [],
      currentTokenIds: ['1', '2'],
    };

    const apiCallReturn = {
      json: { transferInformation: transferInfo },
      status: 200,
    };
    const spyApiCall = jest.spyOn(apiCall, 'default').mockResolvedValueOnce(apiCallReturn);

    const result = await tokenTransfers(network, walletAddress, contractAddress, contractABI, host);

    expect(spyApiCall).toBeCalledTimes(1);
    expect(spyApiCall).toBeCalledWith({
      relativePath: 'contracts/transfers',
      body: {
        network, walletAddress,
        contractAddress,
        contractABI
      },
      method: 'POST',
      host
    });
    expect(result).toEqual(apiCallReturn.json.transferInformation);
  });
});
