import { useCallback, useEffect, useMemo, useState } from 'react'
import { WalletAdapter } from "@mysten/wallet-adapter-base";
import { Signer, SignerType } from '../types/Signer';
import useSuiWalletConnect from './useSuiWalletConnect';
export interface SuiWalletResponse {
    wallets: WalletAdapter[];
    selectWallet: (walletName: string) => void,
    noConnection: boolean,
    signer: Signer | null;
    setSigner: (signer: Signer | null) => void;
}

const useSuiWallet = (): SuiWalletResponse => {
    const { 
        wallets, 
        select: selectWallet, 
        connected,
        noConnection, 
        getAccounts, 
        signAndExecuteTransaction 
    } = useSuiWalletConnect()

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
  
    const constructedSigner = useMemo<Signer>(() => ({
        type: SignerType.EXTENSION,
        getAccounts,
        getAddress,
        signAndExecuteTransaction,
        requestPreapproval,
        sign
    }), []);

    const [signer, setSigner] = useState<Signer | null>(
        connected ?  constructedSigner : null
    )
  
    useEffect(() => {
        if (!connected) return;

        setSigner(constructedSigner)
    }, [connected])

    return { noConnection, wallets, selectWallet, signer, setSigner }
}

export default useSuiWallet
