import getIframe from './getIframe'

const postMessage = (message: any) => {
  const iframe = getIframe()
  iframe?.contentWindow?.postMessage(message, '*')
}

export default postMessage
