import store from 'store2'
import getIframe from './getIframe'
import log from './log'

const postIFrameMessage = (message: any) => {
  const iframe = getIframe()
  
  if (!(iframe as any)?.getAttribute('readyToReceiveMessages')) {
    const messageStore = store.namespace('iframeMessages')
    const existingMessages = messageStore('messages') || []
    const result = messageStore('messages', [...existingMessages, message])
    log("Storing iframe message", result)
    return;
  }

  iframe?.contentWindow?.postMessage(message, '*')
}

export default postIFrameMessage
