import {
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import type {
    SuiAddress,
    SuiTransactionResponse,
    SignableTransaction,
  } from "@mysten/sui.js";
import { WalletAdapter } from "@mysten/wallet-adapter-base";
import useWalletStandardAdapter from "./useWalletStandardAdapter";

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
    const wallets = useWalletStandardAdapter();
    
    const [wallet, setWallet] = useState<WalletAdapter | null>(null);
    const [connected, setConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [noConnection, setNoConnection] = useState(false);
  
    const disconnect = useCallback(async () => {
      setConnected(false);
      setWallet(null);
      localStorage.removeItem(DEFAULT_STORAGE_KEY);
    }, []);
  
    // Once we connect, we remember that we've connected before to enable auto-connect:
    useEffect(() => {
      if (connected && wallet) {
        localStorage.setItem(DEFAULT_STORAGE_KEY, wallet.name);
      }
    }, [wallet, connected]);
  
    const select = useCallback(
      async (name: string) => {
        let selectedWallet = 
          wallets.find((wallet) => wallet.name === name) ?? null;
  
        setWallet(selectedWallet);
        console.log("SET WALLET", selectedWallet)
  
        if (selectedWallet && !selectedWallet.connecting) {
          try {
            setConnecting(true);
            await selectedWallet.connect();
            setConnected(true);
          } catch (e) {
            setConnected(false);
          } finally {
            setConnecting(false);
          }
        }
      },
      [wallets]
    );
  
    // // Auto-connect to the preferred wallet if there is one in storage:
    useEffect(() => {
        if (!wallet && !connected && !connecting) {
            let preferredWallet = localStorage.getItem(DEFAULT_STORAGE_KEY);
            if (typeof preferredWallet === "string") {
                select(preferredWallet);
            } else {
                setNoConnection(true);
            }
        }

        if (!wallets || wallets.length === 0) {
            setNoConnection(true);
        }
    }, [wallets, wallet, connected, connecting, select]);

    const walletContext = useMemo<WalletContextState>(
        () => ({
            wallets,
            wallet,
            connecting,
            connected,
            noConnection,
            select,
            disconnect,
    
            async getAccounts() {
                console.log("WALLET", wallet)
                if (wallet == null) throw Error("Wallet Not Connected");
                return wallet.getAccounts();
            },
    
            async signAndExecuteTransaction(transaction) {
                if (wallet == null) {
                    throw new Error("Wallet Not Connected");
                }
                if (!wallet.signAndExecuteTransaction) {
                    throw new Error(
                        'Wallet does not support "signAndExecuteTransaction" method'
                    );
                }
                return wallet.signAndExecuteTransaction(transaction);
            },
        }),
        [wallets, wallet, select, disconnect, connecting, connected, noConnection]
    );

    return walletContext;
}

export default useSuiWalletConnect;