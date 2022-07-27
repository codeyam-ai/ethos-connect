import store from 'store2'
import { User } from 'types/User'
import getConfiguration from './getConfiguration'
import showWallet from './showWallet'
import postMessage from './postMessage'

export type loginArgs = {
  email?: string, 
  provider?: string, 
  appId: string
}

const login = async ({ email, provider, appId }: loginArgs) => {
  const { walletAppUrl } = getConfiguration();
  const userStore = store.namespace('users')

  if (provider) {
    location.href = `${walletAppUrl}/socialauth`;
    return;
  }

  return new Promise<User|null>((resolve, _reject) => {
    const loginEventListener = (message: any) => {
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        if (action !== 'login') return
        window.removeEventListener('message', loginEventListener)

        console.log('LOGIN USER DATA', data)
        userStore('current', data)
        resolve(data)
      }
    }

    window.addEventListener('message', loginEventListener)

    postMessage({
      action: 'login',
      data: {
        email,
        provider,
        returnTo: window.location.href,
        appId
      },
    })
  })
}

export default login
