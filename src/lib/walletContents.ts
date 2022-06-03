import { NFT } from '../types/NFT';
import apiCall from './apiCall';

const walletContents = async (address: string): Promise<NFT[]> => {
  const { json: { nfts }, status } = await apiCall({
    relativePath: `nfts/${address}`
  })

  if (status !== 200) {
    console.log("Error with wallet contents", status);
    return [];
  }

  return nfts;
}

export default walletContents;