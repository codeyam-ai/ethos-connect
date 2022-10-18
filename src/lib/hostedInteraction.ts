import getConfiguration from "./getConfiguration";
import getIframe from "./getIframe";
import log from "./log";
import postIFrameMessage from "./postIFrameMessage";

export type HostedInteractionArgs = {
  id?: string | number,
  action: string,
  data: any,
  onResponse: (response: any) => void,
  showWallet?: boolean
}

export type HostedInteractionResponse = {
  state?: string,
  data?: any
}

const hostedInteraction = ({ id, action, data, onResponse, showWallet=false }: HostedInteractionArgs) => {
  const { walletAppUrl } = getConfiguration();

  const iframeListener = (message: any) => {
    if (message.origin === walletAppUrl) {
      const { id: responseId, action: responseAction, data: responseData } = message.data
      if (responseAction !== action) return
      if (responseId && responseId != id) return;
      onResponse(responseData);
      window.removeEventListener('message', iframeListener);
    }
  }

  window.addEventListener('message', iframeListener)

  log("hostedInteraction", "Posting interaction", id, action, data)
  postIFrameMessage({ id, action, data })

  getIframe(showWallet);
}

export default hostedInteraction;