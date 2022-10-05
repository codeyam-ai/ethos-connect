import { useEffect, useState } from 'react'
import store from 'store2'
import log from '../lib/log'

import type { Preapproval } from '../lib/requestPreapproval'

export type SuiProviderAndSigner = {
  provider: any | null
  signer: any | null
}

const useSuiWallet = (): { providerAndSigner: SuiProviderAndSigner, setProviderAndSigner: (providerAndSigner: SuiProviderAndSigner | null) => void } => {
  const [providerAndSigner, setProviderAndSigner] = useState<any | null>(null)

  const suiWallet = async () => {
    let wallet;
    const w = (window as any)
    if (w.ethosWallet) {
      const hasPermissions = await w.ethosWallet.hasPermissions();
      if (hasPermissions) {
        return w.ethosWallet;
      } else {
        wallet = w.ethosWallet;
      }
    } 
    
    if (w.suiWallet) {
      const hasPermissions = await w.suiWallet.hasPermissions();
      if (hasPermissions) {
        return w.suiWallet;
      }
    }

    return wallet;
  }

  const initSignerAndProvider = (account: string | null) => {
    log('useSuiWallet', 'initSignerAndProvider', account)
    const signer = account
      ? {
          extension: true,
          getAddress: () => account,
          disconnect: async (...args: any[]) => {
            const wallet = await suiWallet();
            log('useSuiWallet', 'disconnect', wallet.disconnect, wallet)
            if (wallet.disconnect) {
              return wallet.disconnect(...args);
            } else {
              console.log("Signer does not support the ability to disconnect from the client interface.")
            }
          },
          hasPermissions: async (...args: any[]) => {
            const wallet = await suiWallet();
            return wallet.hasPermissions(...args);
          },
          requestPermissions: async (...args: any[]) => {
            const wallet = await suiWallet();
            return wallet.requestPermissions(...args);
          },
          transact: async (details: any) => {
            const wallet = await suiWallet();
            try {
              const response = await wallet.executeMoveCall(ensureCompatible(details))
              return response
            } catch (error) {
              console.log('Error with sui transaction', error)
              return { error }
            }
          },
          signMessage: async (...args: any[]) => {
            const wallet = await suiWallet();
            return wallet.signMessage(...args);
          },
          executeSerializedMoveCall: async (...args: any[]) => {
            const wallet = await suiWallet();
            return wallet.executeSerializedMoveCall(...args);
          },
          requestPreapproval: async (preapproval: Preapproval) => {
            const wallet = await suiWallet();
            try {
              return wallet.requestPreapproval(preapproval)
            } catch (error) {
              console.log('Error with sui preapproval request', error)
              return { error }
            }
          }
        }
      : null

    const provider = {
      getSigner: signer,
    }

    log('useSuiWallet', 'SetProviderAndSigner', {
      provider,
      signer
    })
    setProviderAndSigner({
      provider,
      signer
    })
  }

  const retrieveSuiAccount = async () => {
    const wallet = await suiWallet()
    if (wallet) {
      const hasPermissions = await wallet.hasPermissions()
      if (hasPermissions) {
        const accounts = await wallet.getAccounts()

        if (accounts && accounts.length > 0) {
          log('useSuiWallet', 'INIT SUI 1', accounts)
          initSignerAndProvider(accounts[0])
        }
      } else {
        log('useSuiWallet', 'INIT SUI 2')
        initSignerAndProvider(null)
      }
    } else {
      log('useSuiWallet', 'INIT SUI 3')
      initSignerAndProvider(null)
    }
  }

  useEffect(() => {
    setTimeout(retrieveSuiAccount, 100)

    const storageListener = (event: any) => {
      if (event.type === 'ethos-storage-changed') {
        const suiStore = store.namespace('sui')
        const account = suiStore('account')
        log('useSuiWallet', 'INIT SUI 4', account)
        initSignerAndProvider(account)
      }
    }

    window.addEventListener('storage', storageListener)
    window.addEventListener('ethos-storage-changed', storageListener)

    return () => {
      window.removeEventListener('storage', storageListener)
      window.removeEventListener('ethos-storage-changed', storageListener)
    }
  }, [])

  const ensureCompatible = (details: any) => ({
    ...details,
    packageObjectId: details.packageObjectId || details.address,
    module: details.module || details.moduleName,
    function: details.function || details.functionName,
    typeArguments: details.typeArguments || [],
    arguments: details.arguments || details.inputValues,
  })

  return { providerAndSigner, setProviderAndSigner }
}

export default useSuiWallet
