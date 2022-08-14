import { ProviderAndSigner } from '../types/ProviderAndSigner'
import getConfiguration from './getConfiguration'
import log from './log'

const listenForMobileConnection = async (onConnect: (providerAndSigner: ProviderAndSigner) => void) => {
  const { walletAppUrl } = getConfiguration()

  const connectionEventListener = (message: any) => {
    if (message.origin === walletAppUrl) {
      const { action, data } = message.data
      if (action !== 'connect') return

      if (!data.address) {
        onConnect({ provider: {}, signer: null, contents: null })
        return;
      };

      window.removeEventListener('message', connectionEventListener)
      
      const signer = {
        getAddress: () => data.address
      }

      const provider = {
        getSigner: signer,
      }

      log('mobile', 'Mobile connection established', provider, signer)
      onConnect({ provider, signer, contents: null })
    }
  }

  window.removeEventListener('message', connectionEventListener)
  window.addEventListener('message', connectionEventListener)
}

export default listenForMobileConnection