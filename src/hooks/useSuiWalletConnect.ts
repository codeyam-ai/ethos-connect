import {
    useCallback,
    useEffect,
    useState,
  } from "react";
  import type {
    SuiAddress,
    SuiTransactionResponse,
    SignableTransaction,
  } from "@mysten/sui.js";
import { WalletAdapter } from "@mysten/wallet-adapter-base";
import useWalletAdapters from "./useWalletAdapters";
import { Preapproval } from "types/Preapproval";

const DEFAULT_STORAGE_KEY = "preferredSuiWallet";

export interface WalletContextState {
    wallets: WalletAdapter[];
  
    // Wallet that we are currently connected to
    wallet: WalletAdapter | null;
  
    connecting: boolean;
    connected: boolean;
    noConnection: boolean;
    // disconnecting: boolean;
  
    select(walletName: string): void;
    disconnect(): Promise<void>;
  
    getAccounts: () => Promise<SuiAddress[]>;
  
    signAndExecuteTransaction(
      transaction: SignableTransaction
    ): Promise<SuiTransactionResponse>;
  }
  
const useSuiWalletConnect = () => {
    const wallets = useWalletAdapters();
    
    const [wallet, setWallet] = useState<WalletAdapter | null>(null);
    const [connected, setConnected] = useState(false);
    const [connecting, setConnecting] = useState(true);
  
    // Once we connect, we remember that we've connected before to enable auto-connect:
    useEffect(() => {
      if (connected && wallet) {
        localStorage.setItem(DEFAULT_STORAGE_KEY, wallet.name);
      }
    }, [wallet, connected]);
  
    const select = useCallback(
      async (name: string): Promise<boolean> => {
        let selectedWallet = 
          wallets.find((wallet) => wallet.name === name) ?? null;
  
        setWallet(selectedWallet);
  
        let _connected = false;
        if (selectedWallet && !selectedWallet.connecting) {
          try {
            await selectedWallet.connect();
            setConnected(true);
            _connected = true
          } catch (e) {
            setConnected(false);
          } finally {
            setConnecting(false);
          }
        }

        return _connected;
      },
      [wallets]
    );
  
    // // Auto-connect to the preferred wallet if there is one in storage:
    useEffect(() => {
        const checkWallets = async () => {
            if (!wallet && !connected && !connecting) {
                let preferredWallet = localStorage.getItem(DEFAULT_STORAGE_KEY);
                if (typeof preferredWallet === "string") {
                    if (!wallets || wallets.length === 0) return;
                    const success = await select(preferredWallet)
                    if (!success) {
                        setConnecting(false);
                        localStorage.removeItem(DEFAULT_STORAGE_KEY)
                    }
                    return;
                } else if ((wallets || []).length > 0) {
                    for (const wallet of wallets) {
                        if (wallet.name !== "Ethos Wallet") continue;
                        const accounts = await wallet.getAccounts();
                        if ((accounts || []).length > 0) {
                            const success = await select(wallet.name);
                            if (success) return;
                        }
                    }
                }

                setConnecting(false);
            }
    
            if (!wallets || wallets.length === 0) {
                setConnecting(false);
            }
        }
        
        checkWallets();
    }, [wallets, wallet, connected, connecting, select]);

    const getAccounts = useCallback(async () => {
        if (wallet == null) throw Error("Wallet Not Connected");
        return wallet.getAccounts();
    }, [wallet])

    const getAddress = useCallback(async () => {
        const accounts = await getAccounts();
        return accounts[0];
    }, [getAccounts])

    const disconnect = useCallback(() => {
        setConnected(false);
        localStorage.removeItem(DEFAULT_STORAGE_KEY);

        if (wallet == null) throw Error("Wallet Not Connected");

        if (!wallet.disconnect) {
            throw new Error(
                'Wallet does not support "disconnect" method'
            );
        }

        wallet.disconnect();
        setWallet(null);
    }, [wallet])

    const signAndExecuteTransaction = useCallback(async (transaction) => {
        if (wallet == null) {
            throw new Error("Wallet Not Connected");
        }
        if (!wallet.signAndExecuteTransaction) {
            throw new Error(
                'Wallet does not support "signAndExecuteTransaction" method'
            );
        }
        return wallet.signAndExecuteTransaction(transaction);
    }, [wallet]);

    const requestPreapproval = useCallback(async (preapproval: Preapproval) => {
        if (wallet == null) {
            throw new Error("Wallet Not Connected");
        }

        const ethosWallet = (window as any).ethosWallet
        if (!ethosWallet || wallet.name !== "Ethos Wallet") {
            console.log("Wallet does not support preapproval")
            return false;
        }

        return ethosWallet.requestPreapproval(preapproval)
    }, [connected]);

    const sign = useCallback(async () => {
        return false;
    }, [wallet])

    return {
        wallets,
        wallet,
        connecting,
        connected,
        select,
        getAccounts,
        getAddress,
        signAndExecuteTransaction,
        requestPreapproval,
        sign,
        disconnect
    };
}

export default useSuiWalletConnect;