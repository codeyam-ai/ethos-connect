import { appBaseUrl } from "./constants";

const getIframe = (appId, show=false) => {
  const iframeId = 'ethos-wallet-iframe'

  let iframe = document.getElementById(iframeId);

  const close = () => {
    iframe.style.width = 0;
    iframe.style.height = 0;
  }

  if (!iframe) {
    iframe = document.createElement('IFRAME');
    iframe.src = appBaseUrl + `/wallet?appId=${appId}`;
    iframe.id = iframeId;
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.right = '60px';
    iframe.style.width = 0;
    iframe.style.height = 0;
    iframe.setAttribute('allow', "payment; clipboard-read; clipboard-write")
    document.body.appendChild(iframe);
    
    window.addEventListener('message', (message) => {
      if (message.origin === appBaseUrl) {
        if (message.data.close) {
          close();
        }
      }
    });  
  }

  if (show) {
    iframe.style.width = '360px';
    iframe.style.height = '600px';
  } else {
    close();
  }

  return iframe;
}

export default getIframe;