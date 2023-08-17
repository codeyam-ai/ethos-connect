import { useContext } from 'react';
import { ClientAndSigner } from 'types/ClientAndSigner';
import ConnectContext from '../components/ConnectContext';

const useClientAndSigner = (): ClientAndSigner => {
  const { clientAndSigner } = useContext(ConnectContext);

  return clientAndSigner || { client: null, signer: null };
}

export default useClientAndSigner;