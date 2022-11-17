import { useContext } from 'react';
import { ProviderAndSigner } from 'types/ProviderAndSigner';
import ProviderAndSignerContext from '../components/ProviderAndSignerContext'

const useProviderAndSigner = (): ProviderAndSigner => {
  const providerAndSigner = useContext(ProviderAndSignerContext);

  return providerAndSigner || { provider: null };
}

export default useProviderAndSigner;