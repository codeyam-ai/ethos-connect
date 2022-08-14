import getConfiguration from './getConfiguration'
import getIframe from './getIframe'
import postIFrameMessage from './postIFrameMessage'

type signProps = {
  signData: any
  onComplete: (response: any) => void
}

const sign = async ({ signData, onComplete }: signProps) => {
  const { walletAppUrl } = getConfiguration()

  const signEventListener = (message: any) => {
    if (message.origin === walletAppUrl) {
      const { action, data } = message.data
      if (action !== 'sign') return

      const { state, response } = data

      switch (state) {
        case 'complete':
          onComplete && onComplete(response)
          window.removeEventListener('message', signEventListener)
          break
        default:
          break
      }
    }
  }

  window.addEventListener('message', signEventListener)

  postIFrameMessage({
    action: 'sign',
    data: { signData }
  })

  getIframe(true)
}

export default sign
