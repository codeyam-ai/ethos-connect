import apiCall from './apiCall'
import log from './log'
import { Chain } from '../enums/Chain'

const getWalletNfts = async (address: string, chain: Chain) => {
  const {
    json: { nfts },
    status,
  } = await apiCall({
    relativePath: `nfts/${address}?chain=${chain}`,
  })

  if (status !== 200) {
    log('walletNfts', 'Error with wallet NFTs', status)
    return
  }

  return nfts
}

export default getWalletNfts
