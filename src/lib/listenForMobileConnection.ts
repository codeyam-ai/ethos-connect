import getConfiguration from './getConfiguration'

const listenForMobileConnection = async (): Promise<any> => {
  const { walletAppUrl } = getConfiguration()

  return new Promise((resolve, _reject) => {
    const connectionEventListener = (message: any) => {
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        if (action !== 'connect') return

        window.removeEventListener('message', connectionEventListener)

        if (!data.address) {
          resolve({ provider: {} })
          return;
        };
        
        const signer = {
          getAddress: () => data.address
        }

        const provider = {
          getSigner: signer,
        }

        console.log({ provider, signer })
        resolve({ provider, signer })
      }
    }

    window.removeEventListener('message', connectionEventListener)
    window.addEventListener('message', connectionEventListener)
  })
}

export default listenForMobileConnection