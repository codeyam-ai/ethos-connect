import { useEffect, useState } from "react";
import store from "store2";

const useSuiWallet = () => {
  const [account, setAccount] = useState<string|null>(null);

  const retrieveSuiAccount = async () => {
    const suiWallet = (window as any).suiWallet

    if (suiWallet) {
      const hasPermissions = await suiWallet.hasPermissions()
      if (hasPermissions) {
        const accounts = await suiWallet.getAccounts()
             
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0])
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
        setAccount(account)
      }
    }
    
    window.addEventListener('storage', storageListener);
    window.addEventListener('ethos-storage-changed', storageListener)

    return () => {  
      window.removeEventListener('storage', storageListener);
      window.removeEventListener('ethos-storage-changed', storageListener);
    } 
  }, []);

  return {
    account
  }
}

export default useSuiWallet;