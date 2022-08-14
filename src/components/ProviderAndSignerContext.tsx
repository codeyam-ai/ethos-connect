import { createContext } from 'react';
import { ProviderAndSigner } from '../types/ProviderAndSigner';

const defaultProviderAndSigner: ProviderAndSigner|null = {
  provider: null,
  signer: null,
  contents: null
}

const ProviderAndSignerContext = createContext(defaultProviderAndSigner);

export default ProviderAndSignerContext;