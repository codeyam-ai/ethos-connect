import useProviderAndSigner from "./useClientAndSigner";

const useAddress = () => {
    const { signer } = useProviderAndSigner();

    return signer?.currentAccount?.address;
}

export default useAddress;