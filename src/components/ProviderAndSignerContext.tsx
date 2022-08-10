import { createContext } from 'react';
import { ProviderAndSigner } from './EthosWrapper';

const defaultProviderAndSigner: ProviderAndSigner|null = {
  provider: null,
  signer: null,
  contents: null
}

const ProviderAndSignerContext = createContext(defaultProviderAndSigner);

export default ProviderAndSignerContext;