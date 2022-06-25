import getConfiguration from './getConfiguration'

type getIframeProps = {
  appId: string
  show?: boolean
}

const getIframe = ({ appId, show = false }: getIframeProps) => {
  const iframeId = 'ethos-wallet-iframe'
  let scrollY: number = 0

  let iframe = document.getElementById(iframeId) as HTMLIFrameElement

  const close = () => {
    if (!iframe) return
    iframe.style.width = '0'
    iframe.style.height = '0'
  }

  const { walletAppUrl } = getConfiguration()

  if (!iframe) {
    iframe = document.createElement('IFRAME') as HTMLIFrameElement
    iframe.src = walletAppUrl + `/wallet?appId=${appId}`
    iframe.id = iframeId
    iframe.style.border = 'none'
    iframe.style.position = 'absolute'
    iframe.style.top = scrollY + 'px'
    iframe.style.right = '60px'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.setAttribute('allow', 'payment; clipboard-read; clipboard-write')
    document.body.appendChild(iframe)

    window.addEventListener('message', (message) => {
      if (message.origin === walletAppUrl) {
        if (message.data.close) {
          close()
        }
      }
    })

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY
      iframe.style.top = scrollY + 'px'
    })
  }

  if (show) {
    iframe.style.width = '360px'
    iframe.style.height = '600px'
  } else {
    close()
  }

  return iframe
}

export default getIframe
