import store from 'store2'
import getConfiguration from './getConfiguration'
import log from './log'
import postIFrameMessage from './postIFrameMessage'

const getIframe = (show?: boolean) => {
  const { appId } = getConfiguration()
  log('getIframe', 'getIframe', appId)

  const iframeId = 'ethos-wallet-iframe'
  let scrollY: number = 0

  let iframe = document.getElementById(iframeId) as HTMLIFrameElement

  const close = () => {
    if (!iframe) return
    iframe.style.width = '1px'
    iframe.style.height = '1px'
  }

  const { walletAppUrl } = getConfiguration()

  if (!iframe) {
    const queryParams = new URLSearchParams(window.location.search)
    const auth = queryParams.get('auth')

    let fullWalletAppUrl = walletAppUrl + `/wallet?appId=${appId}`
    if (auth) {
      fullWalletAppUrl += `&auth=${auth}`

      queryParams.delete('auth')
      let fullPath = location.protocol + '//' + location.host + location.pathname
      if (queryParams.toString().length > 0) {
        fullPath += '?' + queryParams.toString()
      }
      store.namespace('auth')('access_token', auth)
      window.history.pushState({}, '', fullPath)
    } else {
      const accessToken = store.namespace('auth')('access_token')
      if (accessToken) {
        fullWalletAppUrl += `&auth=${accessToken}`
      }
    }

    log('getIframe', 'Load Iframe', fullWalletAppUrl)
    iframe = document.createElement('IFRAME') as HTMLIFrameElement
    iframe.src = fullWalletAppUrl
    iframe.id = iframeId
    iframe.style.border = 'none'
    iframe.style.position = 'absolute'
    iframe.style.top = scrollY + 'px'
    iframe.style.right = '60px'
    iframe.style.width = '1px'
    iframe.style.height = '1px'
    iframe.style.zIndex = '99';
    iframe.setAttribute('allow', 'payment; clipboard-read; clipboard-write')
    document.body.appendChild(iframe)

    window.addEventListener('message', (message) => {
      if (message.origin === walletAppUrl) {

        const { action } = message.data;

        switch (action) {
          case 'close':
            close()
            break;
          case 'ready':
            console.log("readyToReceiveMessages!")
            iframe.setAttribute('readyToReceiveMessages', 'true')
            
            const messageStore = store.namespace('iframeMessages')
            const messages = messageStore('messages') || []
            console.log("POSTING PENDING!!!", messages)
            for (const message of messages) {
              postIFrameMessage(message)
            }
            messageStore('messages', null)

            break;
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
  } else if (show !== undefined) {
    close()
  }

  return iframe
}

export default getIframe
