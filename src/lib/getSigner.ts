import { ethers } from "ethers";
import apiCall from "./apiCall";
import { appBaseUrl } from "./constants";

const getSigner = async (): Promise<ethers.providers.JsonRpcSigner | undefined> => {
    const { json: { isUserSignedIn } } = await apiCall({
        relativePath: 'users/isUserSignedIn',
    })
    console.log('isUserSignedIn :>> ', isUserSignedIn);

    if (isUserSignedIn) {
        const provider = new ethers.providers.JsonRpcProvider(appBaseUrl + '/api/rpc');
        return provider.getSigner();
    }
    return undefined
}

export default getSigner;