import { WalletContextContents } from "./WalletContextContents";
import { ModalContextContents } from './ModalContextContents';
import { ProviderAndSigner } from './ProviderAndSigner';
import { EthosConfiguration } from './EthosConfiguration';

export interface ConnectContextContents {
    wallet?: WalletContextContents,
    modal?: ModalContextContents,
    providerAndSigner?: ProviderAndSigner,
    ethosConfiguration?: EthosConfiguration,
    init: (configuration: EthosConfiguration) => void
}