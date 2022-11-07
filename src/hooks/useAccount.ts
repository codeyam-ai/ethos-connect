import getWalletContents from '../lib/getWalletContents';
import { useEffect, useState } from 'react'
import { Signer } from 'types/Signer';

const useAccount = (signer: Signer) => {
  const [account, setAccount] = useState<any|null>({})
  
  useEffect(() => {
    if (!signer) return;
   
    const initAccount = async () => {
      const address = await signer?.getAddress();
      if (!address) {
        return
      }
      const contents = await getWalletContents(address);
      setAccount({
        address,
        contents
      }) 
    }    

    initAccount();
    const interval = setInterval(initAccount, 3000);

    return () => clearInterval(interval);
  }, [signer])

  return account;
}

export default useAccount;