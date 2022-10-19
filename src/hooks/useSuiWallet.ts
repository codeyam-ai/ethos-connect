import { useCallback, useState } from 'react'
import { WalletAdapter } from "@mysten/wallet-adapter-base";
import { Signer, SignerType } from '../types/Signer';
import useSuiWalletConnect from './useSuiWalletConnect';
export interface SuiWalletResponse {
    wallets: WalletAdapter[];
    signer: Signer | null;
    setSigner: (signer: Signer | null) => void;
}

const useSuiWallet = (): SuiWalletResponse => {
  const { wallets, connected, getAccounts, signAndExecuteTransaction } = useSuiWalletConnect()

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
  
  return { wallets, signer, setSigner }
}

export default useSuiWallet
