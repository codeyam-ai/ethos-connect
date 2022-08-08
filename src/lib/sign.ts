import getConfiguration from './getConfiguration'
import getIframe from './getIframe'
import postMessage from './postMessage'

type signProps = {
  signer: any
  signData: any
}

const sign = async ({ signData }: signProps) => {
  const { walletAppUrl } = getConfiguration()

  const signEventListener = (message: any) => {
    if (message.origin === walletAppUrl) {
      const { action, data } = message.data
      if (action !== 'sign') return

      const { state, response } = data

      switch (state) {
        case 'complete':
          console.log("RESPONSE", response)
          window.removeEventListener('message', signEventListener)
          break
        default:
          break
      }
    }
  }

  window.addEventListener('message', signEventListener)

  console.log("SIGN", signData)
  postMessage({
    action: 'sign',
    signData
  })

  getIframe(true)
}

export default sign
