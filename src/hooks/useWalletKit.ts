import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import type { WalletAdapterList } from '@mysten/wallet-adapter-base';
import { createWalletKitCore } from '@mysten/wallet-kit-core'
import { UnsafeBurnerWalletAdapter, WalletStandardAdapterProvider } from '@mysten/wallet-adapter-all-wallets';
import type { WalletKitCore, StorageAdapter } from '@mysten/wallet-kit-core'
import { ExtensionSigner, SignerType } from '../types/Signer';
import { EthosSignMessageInput } from '../types/EthosSignMessageInput';
import { EthosSignAndExecuteTransactionBlockInput } from '../types/EthosSignAndExecuteTransactionBlockInput';
import { DEFAULT_CHAIN } from '../lib/constants';
import { Preapproval } from 'types/Preapproval';

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
      const { wallets, status, currentWallet, accounts, currentAccount } = useSyncExternalStore(
          walletKitRef.current.subscribe,
          walletKitRef.current.getState,
          walletKitRef.current.getState
      );

      useEffect(() => {
          if (!disableAutoConnect) {
              walletKitRef.current?.autoconnect();
          }
      }, [status, wallets]);

      const { autoconnect, ...walletFunctions } = walletKitRef.current;

      const signAndExecuteTransactionBlock = useCallback((input: EthosSignAndExecuteTransactionBlockInput) => {
        if (!currentWallet || !currentAccount) {
          throw new Error("No wallet connect to sign message");
        }

        const account = input.account || currentAccount
        const chain  = input.chain || DEFAULT_CHAIN

        return currentWallet.signAndExecuteTransactionBlock({
          ...input,
          account,
          chain
        })
      }, [currentWallet, currentAccount])

      const signMessage = useCallback((input: EthosSignMessageInput) => {
        if (!currentWallet || !currentAccount) {
          throw new Error("No wallet connect to sign message");
        }

        const account = input.account || currentAccount

        const message = typeof input.message === 'string' ?
          new Uint8Array(Buffer.from(input.message, 'utf8')) :
          input.message;

        return currentWallet.signMessage({
          ...input,
          message,
          account,
        })
      }, [currentWallet, currentAccount])

      const requestPreapproval = useCallback(async (preapproval: Preapproval) => {
        if (!currentWallet || !currentAccount) {
          throw new Error("No wallet connect to preapprove transactions");
        }

        const ethosWallet = (window as any).ethosWallet
        if (!ethosWallet || currentWallet.name !== "Ethos Wallet") {
            console.log("Wallet does not support preapproval")
            return false;
        }

        if (!preapproval.address) {
          preapproval.address = currentAccount.address;
        }

        return ethosWallet.requestPreapproval(preapproval)
      }, [currentWallet, currentAccount])

      const constructedSigner = useMemo<ExtensionSigner | null>(() => {
        if (!currentWallet || !currentAccount) return null;
        
        return {
          type: SignerType.Extension,
          name: currentWallet.name,
          icon: currentWallet.name === 'Sui Wallet' ? 'https://sui.io/favicon.png' : currentWallet.icon,
          getAddress: async () => currentAccount?.address,
          accounts,
          currentAccount,
          signAndExecuteTransactionBlock,
          requestPreapproval,
          signMessage,
          disconnect: () => currentWallet.disconnect()
        }
      }, [currentWallet, accounts, currentAccount]);

      return {
        wallets,
        status,
        signer: constructedSigner,
        ...walletFunctions
      }
}

export default useWalletKit