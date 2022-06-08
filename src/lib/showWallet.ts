import getIframe from "./getIframe";

const showWallet = (appId: string) => {
  getIframe({ appId, show: true });
}

export default showWallet;

