import useProviderAndSigner from "./useProviderAndSigner";

const useAddress = () => {
    const { signer } = useProviderAndSigner();

    return signer?.currentAccount?.address;
}

export default useAddress;