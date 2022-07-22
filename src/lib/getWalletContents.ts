import apiCall from './apiCall'
import log from './log'
import { Chain } from '../enums/Chain'

const getWalletContents = async (address: string, chain: Chain) => {
  const {
    json: { balance, nfts },
    status,
  } = await apiCall({
    relativePath: 'wallet/contents',
    method: 'POST',
    body: { chain, address },
  })

  if (status !== 200) {
    log('walletContents', 'Error with wallet contents', status)
    return
  }

  return { balance, nfts }
}

export default getWalletContents
