import getConfiguration from './getConfiguration'
import postIFrameMessage from './postIFrameMessage'

const getMobileConnectionUrl = async (): Promise<any> => {
  const { walletAppUrl } = getConfiguration()

  return new Promise((resolve, _reject) => {
    const connectionEventListener = (message: any) => {
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        if (action !== 'connect') return
        window.removeEventListener('message', connectionEventListener)
        resolve(data)
      }
    }

    window.addEventListener('message', connectionEventListener)

    postIFrameMessage({
      action: 'connect'
    })
  })
}

export default getMobileConnectionUrl