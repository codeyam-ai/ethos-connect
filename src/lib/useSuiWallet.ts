import { useEffect, useState } from 'react'
import store from 'store2'
import log from './log'

export type SuiProviderAndSigner = {
  provider: any | null
  signer: any | null
}

const useSuiWallet = (): SuiProviderAndSigner => {
  const [providerAndSigner, setProviderAndSigner] = useState<any | null>(null)

  const suiWallet = () => (window as any).suiWallet

  const initSignerAndProvider = (account: string | null) => {
    log('useSuiWallet', 'initSignerAndProvider', account)
    const signer = account
      ? {
          extension: true,
          getAddress: () => account,
          transact: async (details: any) => {
            try {
              const response = await suiWallet().executeMoveCall(ensureCompatible(details))
              return response
            } catch (e) {
              console.log('Error with sui transaction', e)
            }
          },
        }
      : null

    const provider = {
      getSigner: signer,
    }

    log('useSuiWallet', 'SetProviderAndSigner', {
      provider,
      signer,
    })
    setProviderAndSigner({
      provider,
      signer,
    })
  }

  const retrieveSuiAccount = async () => {
    if (suiWallet()) {
      const hasPermissions = await suiWallet().hasPermissions()
      if (hasPermissions) {
        const accounts = await suiWallet().getAccounts()

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
    typeArguments: [],
    arguments: details.arguments || details.inputValues,
  })

  return providerAndSigner
}

export default useSuiWallet
