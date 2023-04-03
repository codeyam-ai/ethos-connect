import getWalletContents from '../lib/getWalletContents';
import { useEffect, useRef, useState } from 'react'
import { Signer } from 'types/Signer';
import { WalletContents } from 'types/WalletContents';

const useAccount = (signer: Signer | null, network: string) => {
  const [account, setAccount] = useState<any | null>({})
  const latestNetwork = useRef<string>(network);
  const existingContents = useRef<WalletContents | undefined>();
 
  useEffect(() => {
    if (!signer) return;
    latestNetwork.current = network;

    const initAccount = async () => {
      const address = signer.currentAccount?.address
      if (!address) {
        return
      }
      
      const contents = await getWalletContents({
        address,
        network, 
        existingContents: existingContents.current
      });

      if (!contents || network !== latestNetwork.current) return;

      existingContents.current = contents;
      setAccount({
        address,
        contents
      })
    }

    initAccount();
    const interval = setInterval(initAccount, 5000);

    return () => clearInterval(interval);
  }, [network, signer])

  return account;
}

export default useAccount;