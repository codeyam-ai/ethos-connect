import getConfiguration from './getConfiguration'
import postMessage from './postMessage'

const establishMobileConnection = async (): Promise<any> => {
  const { walletAppUrl } = getConfiguration()

  return new Promise((resolve, _reject) => {
    const connectionEventListener = (message: any) => {
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        if (action !== 'connect') return
        window.removeEventListener('message', connectionEventListener)

        console.log('DATA', data)
        resolve(data)
      }
    }

    window.addEventListener('message', connectionEventListener)

    postMessage({
      action: 'connect'
    })
  })
}

export default establishMobileConnection