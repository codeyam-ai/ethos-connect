import { useEffect, useMemo, useState } from 'react'
import { WalletAdapter } from "@mysten/wallet-adapter-base";
import { ExtensionSigner, SignerType } from '../types/Signer';
import useSuiWalletConnect from './useSuiWalletConnect';

export interface SuiWalletResponse {
    wallets: WalletAdapter[];
    selectWallet: (walletName: string) => void,
    connecting: boolean,
    noConnection: boolean,
    connected: boolean,
    signer: ExtensionSigner | null;
    setSigner: (signer: ExtensionSigner | null) => void;
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

    const constructedSigner = useMemo<ExtensionSigner>(() => ({
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

    const [signer, setSigner] = useState<ExtensionSigner | null>(
        connected ?  constructedSigner : null
    )
  
    useEffect(() => {
        setSigner(connected ? constructedSigner : null)
    }, [connected, constructedSigner])

    return { connecting, noConnection, connected, wallets, selectWallet, signer, setSigner }
}

export default useSuiWallet
