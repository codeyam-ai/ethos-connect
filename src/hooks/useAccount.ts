import { useEffect, useState } from 'react'
import getIframe from '../lib/getIframe'
import getConfiguration from '../lib/getConfiguration'
import postIFrameMessage from '../lib/postIFrameMessage'

const useAccount = (signer: any) => {
  const [account, setAccount] = useState<any|null>({})

  useEffect(() => {
    if (!signer) return;
    const { walletAppUrl } = getConfiguration()

    let listener: any;

    const initAccount = async () => {
      const address = await signer?.getAddress();

      listener = async (message: any) => {
        if (message.origin === walletAppUrl) {
          const { action, data } = message.data
          if (action === 'account') {
            const { account } = data;
            if (account && address && address === account.address) {
              setAccount(account)
            }
          }
        }
      }
      window.addEventListener('message', listener)
  
      const message = { action: 'account', data: { address } }
      getIframe()
      postIFrameMessage(message)
    }    

    initAccount();
    return () => {
      if (listener) {
        window.removeEventListener('account', listener)
      }
    }
  }, [signer])

  return account;
}

export default useAccount;