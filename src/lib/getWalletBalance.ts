import apiCall from './apiCall'

type GetWalletBalanceProps = {
  address: string
  network: string
  chain: string
}

const getWalletBalance = async ({ address, network, chain }: GetWalletBalanceProps) => {
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
