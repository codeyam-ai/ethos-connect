import { Connection, JsonRpcProvider } from '@mysten/sui.js';
import { DEFAULT_NETWORK, DEFAULT_FAUCET } from './constants';

type DripSuiProps = {
  address: string,
  network?: string
  faucet?: string
}

const dripSui = async ({ address, network, faucet }: DripSuiProps) => {
  const connection = new Connection({ fullnode: network ?? DEFAULT_NETWORK, faucet: `${faucet ?? DEFAULT_FAUCET}gas` })
  const provider = new JsonRpcProvider(connection);
  return provider.requestSuiFromFaucet(address)
}

export default dripSui
