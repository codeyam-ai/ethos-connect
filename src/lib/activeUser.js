import { appBaseUrl } from "./constants";
import getIframe from "./getIframe";

const activeUser = (appId) => {
  return new Promise((resolve, reject) => {
    window.addEventListener("message", (message) => {
      if (message.origin === appBaseUrl) {
        const { action, data } = message.data;
        if (action === 'user') {
          resolve(data?.user);  
        }
      }
    });

    getIframe(appId);
  });
}

export default activeUser;