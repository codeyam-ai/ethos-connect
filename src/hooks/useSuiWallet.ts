import { useEffect, useMemo, useState } from 'react'
import { WalletAdapter } from "@mysten/wallet-adapter-base";
import { Signer, SignerType } from '../types/Signer';
import useSuiWalletConnect from './useSuiWalletConnect';
export interface SuiWalletResponse {
    wallets: WalletAdapter[];
    selectWallet: (walletName: string) => void,
    connecting: boolean,
    noConnection: boolean,
    connected: boolean,
    signer: Signer | null;
    setSigner: (signer: Signer | null) => void;
}

const useSuiWallet = (): SuiWalletResponse => {
    const { 
        wallet,
        wallets, 
        select: selectWallet, 
        connecting, 
        noConnection,
        connected,
        getAccounts, 
        getAddress,
        signAndExecuteTransaction,
        requestPreapproval,
        sign,
        disconnect
    } = useSuiWalletConnect()

    const constructedSigner = useMemo<Signer>(() => ({
        type: SignerType.Extension,
        name: wallet?.name,
        icon: wallet?.name === 'Sui Wallet' ? 'https://sui.io/favicon.png' : wallet?.icon,
        getAccounts,
        getAddress,
        signAndExecuteTransaction,
        requestPreapproval,
        sign,
        disconnect
    }), [wallet, connected, getAccounts, getAddress, signAndExecuteTransaction, requestPreapproval, sign]);

    const [signer, setSigner] = useState<Signer | null>(
        connected ?  constructedSigner : null
    )
  
    useEffect(() => {
        setSigner(connected ? constructedSigner : null)
    }, [connected, constructedSigner])

    return { connecting, noConnection, connected, wallets, selectWallet, signer, setSigner }
}

export default useSuiWallet
