import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import lib from '../lib/lib'
import log from '../lib/log'
import { Chain } from '../enums/Chain'
import { WalletContextContents } from '../types/WalletContextContents'
import useAccount from './useAccount'
import useConnect from './useConnect'
import { EthosConnectStatus } from '../enums/EthosConnectStatus'
import { ModalContextContents } from '../types/ModalContextContents';
import { ConnectContextContents } from '../types/ConnectContextContents';
import { EthosConfiguration } from '../types/EthosConfiguration';
import { ProviderAndSigner } from '../types/ProviderAndSigner';
import { DEFAULT_NETWORK } from '../lib/constants';

export interface UseContextArgs {
    configuration?: EthosConfiguration,
    onWalletConnected?: (providerAndSigner: ProviderAndSigner) => void
}

const useContext = ({ configuration, onWalletConnected }: UseContextArgs): ConnectContextContents => {
    const [ethosConfiguration, setEthosConfiguration] = useState<EthosConfiguration | undefined>(configuration)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const init = useCallback((config?: EthosConfiguration) => {
        if (!config) return;
        if (!config?.chain) config.chain = Chain.Sui;
        if (!config?.network) config.network = DEFAULT_NETWORK;
        if (!config?.walletAppUrl) config.walletAppUrl = 'https://ethoswallet.xyz';

        log('EthosConnectProvider', 'EthosConnectProvider Configuration:', config)
        lib.initializeEthos(config)
        setEthosConfiguration(config);
    }, []);

    useEffect(() => {
        init(configuration);
    }, [configuration])

    const _onWalletConnected = useCallback((providerAndSigner: ProviderAndSigner) => {
        setIsModalOpen(false);
        onWalletConnected && onWalletConnected(providerAndSigner);
    }, [onWalletConnected]);

    const { wallets, connect: selectWallet, providerAndSigner, getState } = useConnect(ethosConfiguration, _onWalletConnected)
    const { address, contents } = useAccount(providerAndSigner.signer, configuration?.network || DEFAULT_NETWORK)

    const modal: ModalContextContents = useMemo(() => {
        const openModal = () => {
            setIsModalOpen(true)
        }

        const closeModal = () => {
            setIsModalOpen(false)
        }

        return {
            isModalOpen,
            openModal,
            closeModal
        }
    }, [isModalOpen, setIsModalOpen])

    const wallet = useMemo(() => {
        const { provider, signer } = providerAndSigner;
        const extensionState = getState();
        let status;

        if (signer?.type === 'hosted') {
            status = EthosConnectStatus.Connected
        } else if (extensionState.isConnecting) {
            status = EthosConnectStatus.Loading
        } else if (provider && extensionState.isConnected) {
            status = EthosConnectStatus.Connected
        } else {
            status = EthosConnectStatus.NoConnection
        }

        const context: WalletContextContents = {
            status,
            wallets: wallets.map(w => ({
                ...w,
                name: w.name,
                icon: w.icon,
            })),
            selectWallet,
            provider
        }

        if (signer) {
            context.wallet = {
                ...signer,
                address,
                contents
            }
        }

        return context;
    }, [
        wallets,
        selectWallet,
        address,
        providerAndSigner,
        contents
    ])

    useEffect(() => {
        if (isModalOpen) {
            document.getElementsByTagName('html').item(0)?.setAttribute('style', 'overflow: hidden;')
        } else {
            document.getElementsByTagName('html').item(0)?.setAttribute('style', '')
        }
    }, [isModalOpen])

    const value = useMemo(() => ({
        wallet,
        modal,
        providerAndSigner
    }), [wallet, modal, providerAndSigner]);

    return { ...value, ethosConfiguration, init }
}

export default useContext;