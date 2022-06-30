import apiCall from './apiCall'
import log from './log'
import { Chain } from '../enums/Chain'

const walletContents = async (address: string, chain: Chain) => {
  const {
    json: { nfts },
    status,
  } = await apiCall({
    relativePath: `nfts/${address}?chain=${chain}`,
  })

  if (status !== 200) {
    log('walletContents', 'Error with wallet contents', status)
    return
  }

  return nfts
}

export default walletContents
