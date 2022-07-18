import { useEffect, useState } from "react";
import store from "store2";

const useSuiWallet = () => {
  const [providerAndSigner, setProviderAndSigner] = useState<any>({})

  const suiWallet = () =>  (window as any).suiWallet

  const initSignerAndProvider = (account: string|null) => {
    const signer = account ? {
      extension: true,
      getAddress: () => account,
      transact: async (details: any) => suiWallet().executeMoveCall(ensureCompatible(details))
    } : null
  
    const provider = account ? {
      getSigner: signer
    } : null

    setProviderAndSigner({
      provider,
      signer
    })
  }

  const retrieveSuiAccount = async () => {
    if (suiWallet()) {
      const hasPermissions = await suiWallet().hasPermissions()
      if (hasPermissions) {
        const accounts = await suiWallet().getAccounts()
             
        if (accounts && accounts.length > 0) {
          initSignerAndProvider(accounts[0])
        }
      }
    }
  }

  useEffect(() => {
    retrieveSuiAccount();

    const storageListener = (event: any) => { 
      if (event.type === 'ethos-storage-changed') {
        const suiStore = store.namespace('sui')
        const account = suiStore('account');
        initSignerAndProvider(account)
      }
    }
    
    window.addEventListener('storage', storageListener);
    window.addEventListener('ethos-storage-changed', storageListener)

    return () => {  
      window.removeEventListener('storage', storageListener);
      window.removeEventListener('ethos-storage-changed', storageListener);
    } 
  }, []);

  const ensureCompatible = (details: any) => ({
    ...details,
    arguments: details.arguments || details.inputValues
  })

  return providerAndSigner
}

export default useSuiWallet;