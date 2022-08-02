import apiCall from './apiCall'
import getConfiguration from './getConfiguration'

const getWalletBalance = async (address: string) => {
  const { network, chain } = getConfiguration();
  const {
    json: { balance },
  } = await apiCall({
    relativePath: 'wallet/balance',
    method: 'POST',
    body: { network, address, chain },
  })

  return balance
}

export default getWalletBalance
