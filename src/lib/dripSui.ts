import getConfiguration from './getConfiguration'
import postMessage from './postMessage'

type DripSuiProps = {
  address: string
}

const dripSui = async ({ address }: DripSuiProps) => {
  const { walletAppUrl } = getConfiguration()

  const dripEventListener = (message: any) => {
    if (message.origin === walletAppUrl) {
      const { action, data } = message.data
      if (action !== 'drip') return
      console.log('DATA', data)
      window.removeEventListener('message', dripEventListener)
    }
  }

  window.addEventListener('message', dripEventListener)

  postMessage({
    action: 'drip',
    data: { address },
  })
}

export default dripSui
