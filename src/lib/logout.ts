import store from 'store2'
import getConfiguration from './getConfiguration'
import log from './log'
import postIFrameMessage from './postIFrameMessage'

const logout = async (signer: any, wallet: boolean = false) => {
  log('logout', `-- Is Extension: ${signer?.extension} --`, `-- Disconnect: ${!!signer?.disconnect} --`, `-- Logout: ${!!signer?.onlogout} --`, "signer", signer)
    
  if (signer?.extension) {
    if (signer.disconnect) {
      await signer.disconnect();
    } else {
      console.log("Signer does not support the ability to disconnect from the client interface.")
    }
   
    signer.onlogout && signer.onlogout();

    return;
  }

  const { walletAppUrl } = getConfiguration()

  store.namespace('auth')('access_token', null)

  return new Promise((resolve) => {
    const listener = (message: any) => {
      log('logout', 'Message origin: ', message.origin, walletAppUrl, message)
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        log('logout', 'message2', action, data)
        if (action === 'user') {
          signer.onlogout && signer.onlogout();

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
