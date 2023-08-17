import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui.js/faucet';

type DripSuiParams = {
  address: string
  networkName: Parameters<typeof getFaucetHost>[0]
}

const dripSui = async ({ address, networkName }: DripSuiParams) => {
  return requestSuiFromFaucetV0({
    host: getFaucetHost(networkName),
    recipient: address
  })
}

export default dripSui
