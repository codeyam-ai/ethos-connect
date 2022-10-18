
// import getConfiguration from './getConfiguration';
// import getIframe from './getIframe';
// import postIFrameMessage from './postIFrameMessage';

import { Preapproval } from "types/Preapproval";

export type PreapprovalArgs = {
  signer: any,
  preapproval: Preapproval
}

const preapprove = async ({ signer, preapproval }: PreapprovalArgs) => {
  if (signer.extension) {
    if (!signer.requestPreapproval) {
      console.log("Signer does not support `requestPreapproval`");
      return false
    }

    return signer.requestPreapproval(preapproval)
  } else {
    console.log("Signer does not support `requestPreapproval`");
    return false;

    // return new Promise((resolve) => {
    //   const { walletAppUrl } = getConfiguration()
  
    //   const permissionEventListener = (message: any) => {
    //     if (message.origin === walletAppUrl) {
    //       const { action, data } = message.data
    //       if (action !== 'request-preapproval') return
          
    //       const { state, response } = data
  
    //       if (state !== "responded") return;

    //       resolve(response);
    //     }
    //   }
  
    //   window.addEventListener('message', permissionEventListener)
  
    //   postIFrameMessage({
    //     action: 'request-preapproval',
    //     data: { preapproval },
    //   })
  
    //   getIframe(true)
    // })
  }

  
}

export default preapprove;