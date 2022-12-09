import { useContext } from "react";
import ConnectContext from '../components/ConnectContext';

const useWallet = () => {
    const { wallet } = useContext(ConnectContext);

    return wallet;
}

export default useWallet;