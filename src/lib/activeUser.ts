import getConfiguration from './getConfiguration'
import getIframe from './getIframe'
import log from './log'
// import postMessage from './postMessage'

const activeUser = () => {
  log('activeUser', 'Calling Active User')
  const { walletAppUrl, appId } = getConfiguration()

  const resolver = (resolve: any) => {
    const listener = (message: any) => {
      log('activeUser', 'Message Origin: ', message.origin, walletAppUrl, message)
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        log('MESSAGE2: ', action, data)
        if (action === 'user' && data.appId === appId) {
          window.removeEventListener('message', listener)
          resolve(data?.user)
        }
      }
    }
    window.addEventListener('message', listener)

    // Compiler isn't handling postMessage
    const message = { action: 'activeUser' }
    const iframe = getIframe()
    log('activeUser", "Post message to the iframe', message)
    iframe?.contentWindow?.postMessage(message, '*')
    // postMessage(message)
  }

  return new Promise(resolver)
}

export default activeUser
