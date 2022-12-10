import getWalletContents from '../lib/getWalletContents';
import { useEffect, useState } from 'react'
import { Signer } from 'types/Signer';

const useAccount = (signer: Signer | null, raw: boolean = false) => {
  const [account, setAccount] = useState<any | null>({})
 
  useEffect(() => {
    if (!signer) return;

    const initAccount = async () => {
      const address = await signer?.getAddress();
      if (!address) {
        return
      }
      const contents = await getWalletContents({
        address, 
        existingContents: account.contents,
        raw
      });

      if (!contents) return;

      setAccount({
        address,
        contents
      })
    }

    initAccount();
    const interval = setInterval(initAccount, 5000);

    return () => clearInterval(interval);
  }, [signer])

  return account;
}

export default useAccount;