import getConfiguration from './getConfiguration'
import log from './log'
import postMessage from './postMessage'

const activeUser = () => {
  const { walletAppUrl } = getConfiguration()
  console.log('WALLET APP URL', walletAppUrl)

  return new Promise((resolve) => {
    const listener = (message: any) => {
      log('activeUser', 'MESSAGE ORIGIN: ', message.origin, walletAppUrl, message)
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        log('MESSAGE2: ', action, data)
        if (action === 'user') {
          window.removeEventListener('message', listener)
          resolve(data?.user)
        }
      }
    }

    window.addEventListener('message', listener)

    postMessage({
      action: 'activeUser',
    })
  })
}

export default activeUser
