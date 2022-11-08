import { useContext } from "react";
import WalletContext from "../components/WalletContext";

const useWallet = () => {
    return useContext(WalletContext);
}

export default useWallet;