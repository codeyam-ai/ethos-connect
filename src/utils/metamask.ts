import { ethers } from "ethers";

// For typescript to ignore the 'window.ethereum' compilation error when connecting to metamask
declare global {
    interface Window {
        ethereum: any;
    }
}

// Not sure if I like this
export type ProviderAndSigner = {
    provider: ethers.providers.Web3Provider,
    signer: ethers.providers.JsonRpcSigner
}

export const connectMetaMask = async (): Promise<ProviderAndSigner> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    return { provider, signer };
}