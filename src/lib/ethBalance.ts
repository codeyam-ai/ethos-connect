import apiCall from './apiCall'

type EthBalanceProps = {
  network: string
  address: string
}

const ethBalance = async ({ network, address }: EthBalanceProps) => {
  const {
    json: { balance },
  } = await apiCall({
    relativePath: 'wallet/balance',
    method: 'POST',
    body: { network, address },
  })

  return balance
}

export default ethBalance
