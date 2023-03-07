import { Connection, JsonRpcProvider } from '@mysten/sui.js';
import { DEFAULT_NETWORK } from './constants';

type DripSuiProps = {
  address: string,
  network?: string
}

const dripSui = async ({ address, network }: DripSuiProps) => {
  const connection = new Connection({ fullnode: network || DEFAULT_NETWORK })
  const provider = new JsonRpcProvider(connection);
  return provider.requestSuiFromFaucet(address)
}

export default dripSui
