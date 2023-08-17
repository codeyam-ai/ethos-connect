import { useContext } from "react";
import ConnectContext from '../components/ConnectContext';
import { WalletContextContents } from '../types/WalletContextContents';
import { EthosConnectStatus } from "../enums/EthosConnectStatus";

const useWallet = (): WalletContextContents => {
    const { wallet } = useContext(ConnectContext);

    return wallet ?? { status: EthosConnectStatus.Loading, client: null, setAltAccount: () => { } };
}

export default useWallet;