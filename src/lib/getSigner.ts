import { ethers } from "ethers";
import activeUser from "./activeUser";
import { appBaseUrl } from "./constants";

const getSigner = async (): Promise<ethers.providers.JsonRpcSigner | undefined> => {
    const user = await activeUser('coffee-demo')
    if (user) {
        const provider = new ethers.providers.JsonRpcProvider(appBaseUrl + '/api/rpc');
        return provider.getSigner();
    }
    return undefined
}

export default getSigner;