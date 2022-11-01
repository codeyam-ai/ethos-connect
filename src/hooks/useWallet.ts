import { useContext } from "react";
import WalletContext from "../components/WalletContext";

const useWallet = () => {
    const wallet = useContext(WalletContext);

    return wallet;
}

export default useWallet;