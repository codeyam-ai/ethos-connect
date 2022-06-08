import apiCall from './apiCall'
import log from './log'

const walletContents = async (address: string) => {
  const {
    json: { nfts },
    status,
  } = await apiCall({
    relativePath: `nfts/${address}`,
  })

  if (status !== 200) {
    log('walletContents', 'Error with wallet contents', status)
    return
  }

  return nfts
}

export default walletContents
