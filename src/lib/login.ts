import store from 'store2'
import { User } from 'types/User'
import getConfiguration from './getConfiguration'
import postIFrameMessage from './postIFrameMessage'

export type loginArgs = {
  email?: string, 
  provider?: string, 
  appId: string
}

const login = async ({ email, provider, appId }: loginArgs) => {
  const { walletAppUrl } = getConfiguration();
  const userStore = store.namespace('users')

  if (provider) {
    const returnTo = location.href;
    const fullUrl = `${walletAppUrl}/auth?appId=${appId}&returnTo=${encodeURIComponent(returnTo)}`
    location.href = `${walletAppUrl}/socialauth?provider=${provider}&redirectTo=${encodeURIComponent(fullUrl)}`;
    return;
  }

  return new Promise<User|null>((resolve, _reject) => {
    const loginEventListener = (message: any) => {
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        if (action !== 'login') return
        window.removeEventListener('message', loginEventListener)

        userStore('current', data)
        resolve(data)
      }
    }

    window.addEventListener('message', loginEventListener)

    postIFrameMessage({
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
