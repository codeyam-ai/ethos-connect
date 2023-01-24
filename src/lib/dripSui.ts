import { JsonRpcProvider } from "@mysten/sui.js";
import { DEFAULT_NETWORK } from './constants';

type DripSuiProps = {
  address: string,
  network: string
}

const dripSui = async ({ address, network }: DripSuiProps) => {
  const provider = new JsonRpcProvider(network || DEFAULT_NETWORK);
  return provider.requestSuiFromFaucet(address)
}

export default dripSui
