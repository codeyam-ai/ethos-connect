import getWalletContents from '../lib/getWalletContents';
import { useEffect, useRef, useState } from 'react'
import { Signer } from 'types/Signer';
import { WalletContents } from '../types/WalletContents';
import { WalletAccount } from '@mysten/wallet-standard';
import { InvalidPackages } from '../types/InvalidPackages';

export type Account = {
  address?: string;
  contents?: WalletContents;
}

const useAccount = (signer: Signer | null, network: string, explicitInterval?: number, invalidPackages?: InvalidPackages) => {
  const [altAccount, setAltAccount] = useState<WalletAccount | undefined>();
  const [account, setAccount] = useState<Account>({});
  const latestNetwork = useRef<string>(network);
  const existingContents = useRef<WalletContents | undefined>();
 
  useEffect(() => {
    if (!signer) return;
    latestNetwork.current = network;

    const initAccount = async () => {
      const address = altAccount?.address ?? signer.currentAccount?.address
      if (!address) {
        return
      }
      setAccount((prev) => { 
        if (prev.address === address) return prev;
        return { ...prev, address }
      });
      
      const contents = await getWalletContents({
        address,
        network, 
        existingContents: existingContents.current,
        invalidPackageModifications: invalidPackages
      });

      if (!contents || network !== latestNetwork.current || JSON.stringify(existingContents.current) === JSON.stringify(contents)) return;

      existingContents.current = contents;
      setAccount((prev) => ({ ...prev, contents }))
    }

    initAccount();
    const interval = setInterval(initAccount, explicitInterval ?? 5000);

    return () => clearInterval(interval);
  }, [network, signer, altAccount])

  return { account, altAccount, setAltAccount };
}

export default useAccount;