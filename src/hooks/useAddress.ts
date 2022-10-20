import { useEffect, useState } from "react";
import useProviderAndSigner from "./useProviderAndSigner";

const useAddress = () => {
    const { signer } = useProviderAndSigner();
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        if (!signer) return;
        signer.getAddress().then(
            (address: string) => setAddress(address)
        );
    }, [signer]);

    return address;
}

export default useAddress;