import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import type { WalletAdapterList } from '@mysten/wallet-adapter-base';
import { createWalletKitCore } from '@mysten/wallet-kit-core'
import { UnsafeBurnerWalletAdapter, WalletStandardAdapterProvider } from '@mysten/wallet-adapter-all-wallets';
import type { WalletKitCore, StorageAdapter } from '@mysten/wallet-kit-core'
import { ExtensionSigner, SignerType } from '../types/Signer';

export interface UseWalletKitArgs {
    configuredAdapters?: WalletAdapterList;
    features?: string[];
    enableUnsafeBurner?: boolean;
    preferredWallets?: string[];
    storageAdapter?: StorageAdapter;
    storageKey?: string;
    disableAutoConnect?: boolean;
}

const useWalletKit = ({ configuredAdapters, features, enableUnsafeBurner, preferredWallets, storageAdapter, storageKey, disableAutoConnect }: UseWalletKitArgs) => {
    const adapters = useMemo(
        () =>
          configuredAdapters ?? [
            new WalletStandardAdapterProvider({ features }),
            ...(enableUnsafeBurner ? [new UnsafeBurnerWalletAdapter()] : []),
          ],
        [configuredAdapters]
      );
    
      const walletKitRef = useRef<WalletKitCore | null>(null);
      if (!walletKitRef.current) {
          walletKitRef.current = createWalletKitCore({
              adapters,
              preferredWallets,
              storageAdapter,
              storageKey,
          });
      }
    
      // Automatically trigger the autoconnect logic when we mount, and whenever wallets change:
      const { wallets } = useSyncExternalStore(
          walletKitRef.current.subscribe,
          walletKitRef.current.getState,
          walletKitRef.current.getState
      );

      useEffect(() => {
          if (!disableAutoConnect) {
              walletKitRef.current?.autoconnect();
          }
      }, [wallets]);

      const { autoconnect, ...walletFunctions } = walletKitRef.current;

      const constructedSigner = useMemo<ExtensionSigner | null>(() => {
        const state = walletKitRef.current?.getState();
        const wallet = state?.currentWallet;
        if (!wallet) return null;

        return {
          type: SignerType.Extension,
          name: wallet?.name,
          icon: wallet?.name === 'Sui Wallet' ? 'https://sui.io/favicon.png' : wallet?.icon,
          accounts: state.accounts,
          currentAccount: state.currentAccount,
          signAndExecuteTransaction: wallet.signAndExecuteTransaction,
          requestPreapproval: () => { return Promise.resolve(true) },
          signMessage: wallet.signMessage,
          disconnect: wallet.disconnect
        }
      }, []);

      return {
        wallets,
        signer: constructedSigner,
        ...walletFunctions
      }
}

export default useWalletKit