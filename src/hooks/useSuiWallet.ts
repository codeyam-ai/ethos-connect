import { useCallback, useState } from 'react'
import { useWallet } from "@mysten/wallet-adapter-react";
import { Signer } from 'types/Signer';

const useSuiWallet = (): { signer: Signer | null, setSigner: (signer: Signer | null) => void } => {
  const { connected, getAccounts, signAndExecuteTransaction } = useWallet();
  
  const requestPreapproval = useCallback(async () => {
    if (!connected) return false;

    return true;
  }, []);

  const getAddress = useCallback(async () => {
    const accounts = await getAccounts();
    return accounts[0];
  }, [])
  
  const [signer, setSigner] = useState<Signer | null>(
    connected ? {
      getAccounts,
      getAddress,
      signAndExecuteTransaction,
      transact: signAndExecuteTransaction,
      requestPreapproval
    } : null
  )
  
  return { signer, setSigner }
}

export default useSuiWallet
