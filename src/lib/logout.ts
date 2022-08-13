import store from 'store2'
import getConfiguration from './getConfiguration'
import log from './log'
import postIFrameMessage from './postIFrameMessage'

const logout = async (wallet: boolean = false) => {
  const { walletAppUrl } = getConfiguration()

  store.namespace('auth')('access_token', null)

  return new Promise((resolve) => {
    const listener = (message: any) => {
      log('logout', 'Message origin: ', message.origin, walletAppUrl, message)
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        log('logout', 'message2', action, data)
        if (action === 'user') {
          resolve(data?.user)
        }
      }
    }

    window.removeEventListener("message", listener)
    window.addEventListener('message', listener)

    postIFrameMessage({
      action: 'logout',
      data: { wallet },
    })
  })
}

export default logout
