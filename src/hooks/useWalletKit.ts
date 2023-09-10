import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import { createWalletKitCore } from '@mysten/wallet-kit-core'
import type { WalletKitCore, StorageAdapter } from '@mysten/wallet-kit-core'
import { ExtensionSigner, SignerType } from '../types/Signer';
import { EthosSignMessageInput } from '../types/EthosSignMessageInput';
import { EthosSignAndExecuteTransactionBlockInput } from '../types/EthosSignAndExecuteTransactionBlockInput';
import { EthosSignTransactionBlockInput } from '../types/EthosSignTransactionBlockInput';
import { DEFAULT_CHAIN } from '../lib/constants';
import { Preapproval } from 'types/Preapproval';
import { Chain } from 'enums/Chain';
import { SuiClient, SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { EthosExecuteTransactionBlockInput } from 'types/EthosExecuteTransactionBlockInput';
import { SuiSignPersonalMessageOutput, SuiSignTransactionBlockOutput, SuiSignMessageInput } from '@mysten/wallet-standard';

export interface UseWalletKitArgs {
    defaultChain: Chain
    client: SuiClient;
    features?: string[];
    enableUnsafeBurner?: boolean;
    preferredWallets?: string[];
    storageAdapter?: StorageAdapter;
    storageKey?: string;
    disableAutoConnect?: boolean;
}

const useWalletKit = ({ defaultChain, client, preferredWallets, storageAdapter, storageKey, disableAutoConnect }: UseWalletKitArgs) => {
      const walletKitRef = useRef<WalletKitCore | null>(null);
      if (!walletKitRef.current) {
          walletKitRef.current = createWalletKitCore({
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

      const signAndExecuteTransactionBlock = useCallback((input: EthosSignAndExecuteTransactionBlockInput): Promise<SuiTransactionBlockResponse> => {
        if (!currentWallet || !currentAccount) {
          throw new Error("No wallet connect to sign message");
        }

        const account = input.account || currentAccount
        const chain  = input.chain || defaultChain || DEFAULT_CHAIN
        return currentWallet.features['sui:signAndExecuteTransactionBlock'].signAndExecuteTransactionBlock({
          ...input,
          account,
          chain
        })
      }, [currentWallet, currentAccount, defaultChain])

      const executeTransactionBlock = useCallback((input: EthosExecuteTransactionBlockInput): Promise<SuiTransactionBlockResponse> => {
        return client.executeTransactionBlock(input)
      }, [client])

      const signTransactionBlock = useCallback((input: EthosSignTransactionBlockInput): Promise<SuiSignTransactionBlockOutput> => {
        if (!currentWallet || !currentAccount) {
          throw new Error("No wallet connect to sign message");
        }

        const account = input.account || currentAccount
        const chain  = input.chain || defaultChain || DEFAULT_CHAIN

        return currentWallet.features['sui:signTransactionBlock'].signTransactionBlock({
          ...input,
          account,
          chain
        })
      }, [currentWallet, currentAccount, defaultChain])

      const signPersonalMessage = useCallback((input: EthosSignMessageInput): Promise<SuiSignPersonalMessageOutput> => {
        if (!currentWallet || !currentAccount) {
          throw new Error("No wallet connect to sign message");
        }

        const account = input.account || currentAccount

        const message = typeof input.message === 'string' ?
          new TextEncoder().encode(input.message) :
          input.message;

        const legacySignMessage = async (input: SuiSignMessageInput) => {
          const response = await currentWallet.features['sui:signMessage']?.signMessage(input)
          return {
            ...response,
            bytes: response?.messageBytes
          }
        }

        const signFunction = currentWallet.features['sui:signPersonalMessage']?.signPersonalMessage ?? legacySignMessage
                    
        return signFunction({
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
        if (!ethosWallet || ["Ethos Wallet", "Ethos Mobile"].indexOf(currentWallet.name) === -1) {
            console.log("Wallet does not support preapproval")
            return false;
        }

        if (!preapproval.address) {
          preapproval.address = currentAccount.address;
        }

        if (!preapproval.chain) {
          preapproval.chain = defaultChain ?? DEFAULT_CHAIN;
        }

        return ethosWallet.requestPreapproval(preapproval)
      }, [currentWallet, currentAccount, defaultChain])

      const constructedSigner = useMemo<ExtensionSigner | null>(() => {
        if (!currentWallet || !currentAccount) return null;
        
        return {
          type: SignerType.Extension,
          name: currentWallet.name,
          icon: currentWallet.icon,
          getAddress: async () => currentAccount?.address,
          accounts,
          currentAccount,
          signAndExecuteTransactionBlock,
          executeTransactionBlock,
          signTransactionBlock,
          requestPreapproval,
          signPersonalMessage,
          disconnect: () => {
            // currentWallet.features['standard:connect'].connect();
            walletKitRef.current?.disconnect();
          },
          client
        }
      }, [
        currentWallet, 
        accounts, 
        currentAccount, 
        signAndExecuteTransactionBlock, 
        executeTransactionBlock, 
        requestPreapproval, 
        signPersonalMessage, 
        client
      ]);

      return {
        wallets,
        status,
        signer: constructedSigner,
        ...walletFunctions
      }
}

export default useWalletKit