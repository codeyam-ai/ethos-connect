import store from 'store2'
import getIframe from './getIframe'

const postIFrameMessage = (message: any) => {
  console.log("POST", message)
  const iframe = getIframe()
  
  console.log("READY TO RECEIVE?", (iframe as any)?.getAttribute('readyToReceiveMessages'))
  // if (!(iframe as any)?.getAttribute('readyToReceiveMessages')) {
  //   const messageStore = store('iframeMessages')
  //   messageStore('message', [...(messageStore('messages') || []), message])
  // }
  // iframe?.contentWindow?.postMessage(message, '*')
}

export default postIFrameMessage
