import apiCall from './apiCall'
import log from './log'
import { NFT } from '../types/NFT'
import getConfiguration from './getConfiguration'

const getWalletNfts = async (address: string): Promise<NFT[]> => {
  const { chain } = getConfiguration();

  const {
    json: { nfts },
    status,
  } = await apiCall({
    relativePath: `nfts/${address}?chain=${chain}`,
  })

  if (status !== 200) {
    log('walletNfts', 'Error with wallet NFTs', status)
    return []
  }

  return nfts
}

export default getWalletNfts
