import getWalletContents from '../lib/getWalletContents';
import { useEffect, useState } from 'react'
import { Signer } from 'types/Signer';

const useAccount = (signer: Signer | null) => {
  const [account, setAccount] = useState<any | null>({})
  const [existingObjectInfos, setExistingObjectInfos] = useState<any | null>([])

  useEffect(() => {
    if (!signer) return;

    const initAccount = async () => {
      const address = await signer?.getAddress();
      if (!address) {
        return
      }
      const contentsWrapper = await getWalletContents(address, existingObjectInfos);

      if (!contentsWrapper) return;

      const { contents, objectInfos } = contentsWrapper;

      setExistingObjectInfos(objectInfos);
      setAccount({
        address,
        contents
      })
    }

    initAccount();
    const interval = setInterval(initAccount, 5000);

    return () => clearInterval(interval);
  }, [signer, existingObjectInfos])

  return account;
}

export default useAccount;