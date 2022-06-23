import { ethers } from "ethers";
import activeUser from "./activeUser";
import { appBaseUrl } from "./constants";

const getSigner = async (appId: string, network: string): Promise<ethers.providers.JsonRpcSigner | undefined> => {
    const user: any = await activeUser(appId)
    if (user) {
        const provider = new ethers.providers.JsonRpcProvider(appBaseUrl + '/api/rpc');
        const signer = provider.getSigner();
        
        return new Proxy(signer, {
          get: (target: any, prop: any, receiver: any) => {
            console.log("IN SIGNER", prop)
            switch (prop) {
              case 'ethos': 
                return {
                  appId,
                  network
                };
              case 'getAddress':
                return async () => user.accounts.find(
                  (account: any) => (
                    account.chain === (network === 'sui' ? 'sui' : 'ethereum')
                  )
                )?.address
              default:
                return Reflect.get(target, prop, receiver);
            }
          }
        });        
    }
    return undefined
}

export default getSigner;