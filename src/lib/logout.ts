import store from 'store2'
import getConfiguration from './getConfiguration'
import log from './log'
import postMessage from './postMessage'

const logout = async (wallet: boolean = false) => {
  const { walletAppUrl } = getConfiguration()

  store.namespace('auth')('access_token', null)

  return new Promise((resolve) => {
    window.addEventListener('message', (message) => {
      log('logout', 'Message origin: ', message.origin, walletAppUrl, message)
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        log('logout', 'message2', action, data)
        if (action === 'user') {
          resolve(data?.user)
        }
      }
    })

    postMessage({
      action: 'logout',
      data: { wallet },
    })
  })
}

export default logout
