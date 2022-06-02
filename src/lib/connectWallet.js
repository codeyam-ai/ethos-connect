import { appBaseUrl } from "./constants";

const connectWallet = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('message', (message) => {
      if (message.origin === appBaseUrl) {
        const { action, data } = message.data;
        if (action === 'user') {
          resolve(data.user)
        }
      }
    }); 

    window.open(
      appBaseUrl + "/connect?appId=ethos", 
      "_blank", 
      `popup,top=100,left=${window.screen.width - 500},width=390,height=420`
    );
  });
}

export default connectWallet;