import getConfiguration from './getConfiguration'
import getIframe from './getIframe'

const postMessage = (message: any) => {
  const { iframeOrigin } = getConfiguration()
  const iframe = getIframe()
  iframe?.contentWindow?.postMessage(message, iframeOrigin || '*')
}

export default postMessage
