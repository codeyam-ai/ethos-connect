import getAppBaseUrl from "./getAppBaseUrl";
import getIframe from "./getIframe";
import log from "./log";

const activeUser = (appId: string) => {
  const walletAppUrl = getAppBaseUrl() 
  console.log("WALLET APP URL", walletAppUrl)

  return new Promise((resolve) => {
    window.addEventListener("message", (message) => {
      log("activeUser", "MESSAGE ORIGIN: ", message.origin, walletAppUrl, message);
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data;
        log("MESSAGE2: ", action, data);
        if (action === 'user') {
          resolve(data?.user);  
        }
      }
    });

    getIframe({ appId });
  });
}

export default activeUser;