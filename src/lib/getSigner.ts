import { ethers } from "ethers";
import activeUser from "./activeUser";
import getConfiguration from "./getConfiguration";
import networkToChain from "./networkToChain";

const getSigner = async (): Promise<ethers.providers.JsonRpcSigner | undefined> => {
    const { appId, network } = getConfiguration();
    const user: any = await activeUser(appId)
    if (user) {
        const { walletAppUrl } = getConfiguration();
        const provider = new ethers.providers.JsonRpcProvider(walletAppUrl + '/api/rpc');
        const signer = provider.getSigner();
        
        return new Proxy(signer, {
          get: (target: any, prop: any, receiver: any) => {
            switch (prop) {
              case 'ethos': 
                return true;
              case 'getAddress':
                return async () => user.accounts.find(
                  (account: any) => (
                    account.chain === networkToChain(network)
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