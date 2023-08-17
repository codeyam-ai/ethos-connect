import { WalletContextContents } from "./WalletContextContents";
import { ModalContextContents } from './ModalContextContents';
import { ClientAndSigner } from './ClientAndSigner';
import { EthosConfiguration } from './EthosConfiguration';

export interface ConnectContextContents {
    wallet?: WalletContextContents,
    modal?: ModalContextContents,
    clientAndSigner?: ClientAndSigner,
    ethosConfiguration?: EthosConfiguration,
    init: (configuration: EthosConfiguration) => void
}