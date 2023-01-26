import store from "store2";
import getConfiguration from "./getConfiguration";
import getIframe from "./getIframe";
import log from "./log";
import postIFrameMessage from "./postIFrameMessage";

export type HostedInteractionArgs = {
  id?: string | number,
  action: string,
  data: any,
  onResponse: (response: HostedInteractionResponse) => void,
  showWallet?: boolean
}

export type HostedInteractionResponse = {
  approved: boolean,
  data?: any
}

const hostedInteraction = ({ id, action, data, onResponse, showWallet=false }: HostedInteractionArgs) => {
  const { walletAppUrl } = getConfiguration();

  const iframeListener = (message: any) => {
    log("hostedInteraction", "response: ", message)
    if (message.origin === walletAppUrl) {
      const { approved, action: responseAction, data: responseData } = message.data
      if (responseAction !== action) return
      onResponse({ approved, data: responseData });
      window.removeEventListener('message', iframeListener);
    }
  }

  window.addEventListener('message', iframeListener)

  const ethosStore = store.namespace('ethos')
  const configuration = ethosStore("configuration");
  const { network } = configuration;
  console.log("CONFIGURATION", configuration)

  log("hostedInteraction", "Posting interaction", id, action, data)
  postIFrameMessage({ id, network, action, data })

  getIframe(showWallet);
}

export default hostedInteraction;