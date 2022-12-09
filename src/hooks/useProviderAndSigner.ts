import { useContext } from 'react';
import { ProviderAndSigner } from 'types/ProviderAndSigner';
import ConnectContext from '../components/ConnectContext';

const useProviderAndSigner = (): ProviderAndSigner => {
  const { providerAndSigner } = useContext(ConnectContext);

  return providerAndSigner || { provider: null };
}

export default useProviderAndSigner;