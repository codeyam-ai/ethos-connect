import apiCall from './apiCall'

type DripSuiProps = {
  address: string
}

const dripSui = async ({ address }: DripSuiProps) => {
  const {
    json: { success },
  } = await apiCall({
    relativePath: 'wallet/drip',
    method: 'POST',
    body: { address },
  })

  return success
}

export default dripSui
