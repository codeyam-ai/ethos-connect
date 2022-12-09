import { createContext } from 'react';
import { EthosConnectStatus } from '../enums/EthosConnectStatus';
import { WalletContextContents } from '../types/WalletContextContents';

const defaultWalletContext: WalletContextContents = {
    status: EthosConnectStatus.Loading,
    provider: null
};

const WalletContext = createContext<WalletContextContents>(defaultWalletContext);

export default WalletContext;