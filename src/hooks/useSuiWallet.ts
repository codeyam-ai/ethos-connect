import { useCallback, useState } from 'react'
import { Signer, SignerType } from '../types/Signer';
import useSuiWalletConnect from './useSuiWalletConnect';

const useSuiWallet = (): { signer: Signer | null, setSigner: (signer: Signer | null) => void } => {
  const { connected, getAccounts, signAndExecuteTransaction } = useSuiWalletConnect()

  const requestPreapproval = useCallback(async () => {
    if (!connected) return false;

    return true;
  }, []);

  const getAddress = useCallback(async () => {
    const accounts = await getAccounts();
    return accounts[0];
  }, [])

  const sign = useCallback(async () => {
    return true;
  }, [])
  
  const [signer, setSigner] = useState<Signer | null>(
    connected ? {
      type: SignerType.EXTENSION,
      getAccounts,
      getAddress,
      signAndExecuteTransaction,
      requestPreapproval,
      sign
    } : null
  )
  
  return { signer, setSigner }
}

export default useSuiWallet
