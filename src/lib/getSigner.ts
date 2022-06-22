import { ethers } from "ethers";
import activeUser from "./activeUser";
import { appBaseUrl } from "./constants";

const getSigner = async (appId: string, network: string): Promise<ethers.providers.JsonRpcSigner | undefined> => {
    const user = await activeUser(appId)
    if (user) {
        const provider = new ethers.providers.JsonRpcProvider(appBaseUrl + '/api/rpc');
        const signer = provider.getSigner() as any;
        signer.ethos = { 
          appId,
          network
        }
        return signer;
    }
    return undefined
}

export default getSigner;