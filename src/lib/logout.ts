import getConfiguration from './getConfiguration'
import getIframe from './getIframe'
import log from './log'

const logout = async (appId: string, wallet: any) => {
  const { walletAppUrl } = getConfiguration()

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

    const iframe = getIframe({ appId })
    iframe?.contentWindow?.postMessage(
      {
        action: 'logout',
        data: { wallet },
      },
      walletAppUrl
    )
  })
}

export default logout
