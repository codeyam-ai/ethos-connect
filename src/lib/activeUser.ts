import getConfiguration from './getConfiguration'
import getIframe from './getIframe'
import log from './log'
import postIFrameMessage from './postIFrameMessage'

const activeUser = () => {
  log('activeUser', 'Calling Active User')
  const { walletAppUrl, apiKey } = getConfiguration()

  const resolver = (resolve: any) => {
    const listener = (message: any) => {
      log('activeUser', 'Message Origin: ', message.origin, walletAppUrl, message)
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        log('MESSAGE2: ', action, data)
        if (action === 'user' && data.apiKey === apiKey) {
          window.removeEventListener('message', listener)
          resolve(data?.user)
        }
      }
    }
    window.addEventListener('message', listener)

    const message = { action: 'activeUser' }
    getIframe()
    log('activeUser", "Post message to the iframe', message)
    postIFrameMessage(message)
  }

  return new Promise(resolver)
}

export default activeUser
