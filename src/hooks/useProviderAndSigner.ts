import { useContext } from 'react';
import ProviderAndSignerContext from '../components/ProviderAndSignerContext'

const useProviderAndSigner = () => {
  const providerAndSigner = useContext(ProviderAndSignerContext);

  return providerAndSigner;
}

export default useProviderAndSigner;