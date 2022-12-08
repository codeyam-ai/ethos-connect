import { JsonRpcProvider, Network } from '@mysten/sui.js';

const useProvider = (): JsonRpcProvider => {
  const provider = new JsonRpcProvider(Network.DEVNET)
  
  return providerAndSigner || { provider: null };
}

export default useProviderAndSigner;