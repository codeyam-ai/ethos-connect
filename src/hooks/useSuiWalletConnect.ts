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
import log from "../lib/log";

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
    const [connecting, setConnecting] = useState(false);
    const [noConnection, setNoConnection] = useState(false);
  
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
            setConnecting(true);
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
      [wallets, setConnected, setConnecting]
    );
  
    useEffect(() => {
        const checkWallets = async () => {
            if (!wallet && !connected && !connecting) {
                let preferredWalletName = localStorage.getItem(DEFAULT_STORAGE_KEY);

                if (typeof preferredWalletName !== "string") {
                    if (location.origin === "https://ethoswallet.xyz") {
                        log('suiWalletConnect', "Wallet explorer", (wallets || []).map((w) => w.name));
                        const ethosWallet = (wallets || []).find(
                            (w) => w.name === "Ethos Wallet"
                        );
                        if (ethosWallet) {
                            // const accounts = await ethosWallet.getAccounts();
                            log('suiWalletConnect', "Ethos wallet connected", ethosWallet.connected);
                            // const accounts = await ethosWallet?.getAccounts();
                            // if (accounts.length > 0) {
                            preferredWalletName = ethosWallet.name;
                            // }
                        }
                    }
                }

                if (typeof preferredWalletName === "string") {
                    if (!wallets || wallets.length === 0) return;

                    // const preferredWallet = wallets.find(
                    //     (w) => w.name === preferredWalletName
                    // );

                    // if (preferredWallet) {
                        // Wallet doesn't always show accounts even when it has permission
                        // const accounts = await preferredWallet.getAccounts();

                        // if (accounts.length > 0) {
                    const success = await select(preferredWalletName)
                    if (!success) {
                        log('suiWalletConnect', "setNoConnection0")
                        setNoConnection(true);
                        localStorage.removeItem(DEFAULT_STORAGE_KEY)
                    }
                    return;
                        // }
                    // }
                }

                log('suiWalletConnect', "setNoConnection1")
                setNoConnection(true);
            }
    
            if (!wallets || wallets.length === 0) {
                log('suiWalletConnect', "setNoConnection2")
                setNoConnection(true);
            }
        }
        
        checkWallets();
    }, [wallets, wallet, connected, connecting, select]);

    const getAccounts = useCallback(async () => {
        if (wallet == null) throw Error("Wallet Not Connected");
        return wallet.getAccounts();
    }, [wallet])

    const getAddress = useCallback(async () => {
        if (wallet == null) throw Error("Wallet Not Connected");
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
    }, [wallet]);

    return {
        wallets,
        wallet,
        connecting,
        noConnection,
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