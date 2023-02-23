import { JsonRpcProvider } from '@mysten/sui.js';
import { DEFAULT_NETWORK } from './constants';

type DripSuiProps = {
  address: string,
  network?: string
}

const dripSui = async ({ address, network }: DripSuiProps) => {
  // If a network is included in the request
  // make sure it's the DEVNET network.
  if(network && network !== DEFAULT_NETWORK) {
    return {
      transferred_gas_objects: [],
      error:
        'The network you provided does not support the faucet. Please use the DEVNET network.',
    };
  }

  // Otherwise, request SUI from the faucet using the given network. 
  // If no network is provided, the default network will be used (devnet).
  const provider = new JsonRpcProvider(network || DEFAULT_NETWORK);
  return provider.requestSuiFromFaucet(address)
}

export default dripSui
