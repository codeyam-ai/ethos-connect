import { appBaseUrl } from "./constants";
import getIframe from "./getIframe";

const logout = (appId, wallet) => {
  const iframe = getIframe(appId);
  iframe.contentWindow.postMessage({
    action: 'logout',
    data: { wallet }
  }, appBaseUrl);
}

export default logout;;