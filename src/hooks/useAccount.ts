import { getWalletContents } from '../lib';
import { useEffect, useState } from 'react'
// import getIframe from '../lib/getIframe'
// import getConfiguration from '../lib/getConfiguration'
// import postIFrameMessage from '../lib/postIFrameMessage'
// import useProvider from './userProvider'

const useAccount = (signer: any) => {
  const [account, setAccount] = useState<any|null>({})
  // const provider = useProvider();

  useEffect(() => {
    if (!signer) return;
    // const { walletAppUrl } = getConfiguration()

    // let listener: any;

    const initAccount = async () => {
      const address = await signer?.getAddress();
      const contents = await getWalletContents(address);
      setAccount({
        address,
        contents
      }) 
      
      // listener = async (message: any) => {
      //   if (message.origin === walletAppUrl) {
      //     const { action, data } = message.data
      //     if (action === 'account') {
      //       const { account } = data;
      //       if (account && address && address === account.address) {
      //         setAccount(account)
      //       }
      //     }
      //   }
      // }
      // window.addEventListener('message', listener)
  
      // const message = { action: 'account', data: { address } }
      // getIframe()
      // postIFrameMessage(message)
    }    

    initAccount();
    // return () => {
    //   if (listener) {
    //     window.removeEventListener('account', listener)
    //   }
    // }
  }, [signer])

  return account;
}

export default useAccount;