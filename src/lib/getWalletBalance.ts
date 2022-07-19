import apiCall from './apiCall'

type GetWalletBalanceProps = {
  network: string
  address: string
}

const getWalletBalance = async ({ network, address }: GetWalletBalanceProps) => {
  const {
    json: { balance },
  } = await apiCall({
    relativePath: 'wallet/balance',
    method: 'POST',
    body: { network, address },
  })

  return balance
}

export default getWalletBalance
