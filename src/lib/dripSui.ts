import { Connection, JsonRpcProvider } from '@mysten/sui.js';
import { DEFAULT_NETWORK, DEFAULT_FAUCET } from './constants';
import {requestSuiFromFaucetV0, getFaucetHost} from '@mysten/sui.js/faucet'

type DripSuiProps = {
  address: string,
  network?: string
  faucet?: string
}

/**
 * @deprecated please use `dripSuiV2` instead
 */
const dripSui = async ({ address, network, faucet }: DripSuiProps) => {
  const connection = new Connection({ fullnode: network ?? DEFAULT_NETWORK, faucet: `${faucet ?? DEFAULT_FAUCET}gas` })
  const provider = new JsonRpcProvider(connection);
  return provider.requestSuiFromFaucet(address)
}

type DripSuiV2Params = {
  address: string
  networkName: Parameters<typeof getFaucetHost>[0]
}

export const dripSuiV2 = async ({ address, networkName }: DripSuiV2Params) => {
  return requestSuiFromFaucetV0({
    host: getFaucetHost(networkName),
    recipient: address
  })
}

export default dripSui
