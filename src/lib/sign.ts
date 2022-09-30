import getConfiguration from './getConfiguration'
import getIframe from './getIframe'
import postIFrameMessage from './postIFrameMessage'

type signProps = {
  signer?: any
  signData: any
  onCompleted?: (response: any) => void
}

const sign = async ({ signer, signData, onCompleted }: signProps): Promise<any> => {
  if (signer?.extension) {
    const response = await signer.signMessage(signData)
    onCompleted && onCompleted({ data: response })
    return response;
  }
  
  return new Promise(
    (resolve) => {
      const { walletAppUrl } = getConfiguration()

      const signEventListener = (message: any) => {
        if (message.origin === walletAppUrl) {
          const { action, data } = message.data
          if (action !== 'sign') return
    
          const { state, response } = data
    
          switch (state) {
            case 'complete':
              onCompleted && onCompleted(response)
              resolve(response)
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
  )
}

export default sign
