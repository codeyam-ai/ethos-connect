import getConfiguration from './getConfiguration'
import postMessage from './postMessage'

type DripSuiProps = {
  address: string
}

const dripSui = async ({ address }: DripSuiProps) => {
  const { walletAppUrl } = getConfiguration()

  return new Promise((resolve, _reject) => {
    const dripEventListener = (message: any) => {
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        if (action !== 'drip') return
        window.removeEventListener('message', dripEventListener)

        console.log('DATA', data)
        resolve(data)
      }
    }

    window.addEventListener('message', dripEventListener)

    postMessage({
      action: 'drip',
      data: { address },
    })
  })
}

export default dripSui
