import type { ObjectId } from '@mysten/sui.js';
import getConfiguration from './getConfiguration';
import getIframe from './getIframe';
import postIFrameMessage from './postIFrameMessage';

export interface AutomaticTransactionPermission {
  module: string,
  function: string,
  objectId: ObjectId,
  description: string,
  totalGasLimit: number;
  perTransactionGasLimit: number;
  maxTransactionCount: number;
}

export type requestAutomatedTransactionPermissionArgs = {
  signer: any,
  permission: AutomaticTransactionPermission
}

const requestAutomatedTransactionPermission = async ({ signer, permission }: requestAutomatedTransactionPermissionArgs) => {
  if (signer.extension) {
    if (!signer.requestAutomatedTransactionPermission) {
      throw("Signer does not support `requestAutomatedTransactionPermission`")
    }

    return signer.requestAutomatedTransactionPermission(permission)
  } else {
    return new Promise((resolve) => {
      const { walletAppUrl } = getConfiguration()
  
      const permissionEventListener = (message: any) => {
        if (message.origin === walletAppUrl) {
          const { action, data } = message.data
          if (action !== 'request-automated-transaction-permission') return
          
          const { state, response } = data
  
          if (state !== "responded") return;

          resolve(response);
        }
      }
  
      window.addEventListener('message', permissionEventListener)
  
      postIFrameMessage({
        action: 'request-automated-transaction-permission',
        data: { permission },
      })
  
      getIframe(true)
    })
  }

  
}

export default requestAutomatedTransactionPermission;