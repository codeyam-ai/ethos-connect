import { ContractInterface } from 'ethers';
import { TokenTransferInformation } from '../types/TokenTransferInformation';
import apiCall from './apiCall';

const tokenTransfers = async (
  network: any,
  walletAddress: string,
  contractAddress: string,
  contractABI: ContractInterface,
  host: string,
): Promise<TokenTransferInformation> => {
  const { json: { transferInformation } } = await apiCall({
    relativePath: 'contracts/transfers',
    body: {
      network, walletAddress,
      contractAddress,
      contractABI
    },
    method: 'POST',
    host
  });

  return transferInformation;
};

export default tokenTransfers;
