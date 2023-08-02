import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import lib from '../lib/lib'
import log from '../lib/log'
import { WalletContextContents } from '../types/WalletContextContents'
import useAccount from './useAccount'
import useConnect from './useConnect'
import { EthosConnectStatus } from '../enums/EthosConnectStatus'
import { ModalContextContents } from '../types/ModalContextContents';
import { ConnectContextContents } from '../types/ConnectContextContents';
import { EthosConfiguration } from '../types/EthosConfiguration';
import { ClientAndSigner } from '../types/ProviderAndSigner';
import { DEFAULT_NETWORK, DEFAULT_CHAIN } from '../lib/constants';

export interface UseContextArgs {
    configuration?: EthosConfiguration,
    onWalletConnected?: (clientAndSigner: ClientAndSigner) => void
}

const DEFAULT_CONFIGURATION = {
    network: DEFAULT_NETWORK,
    chain: DEFAULT_CHAIN,
    walletAppUrl: 'https://ethoswallet.xyz'
}

const useContext = ({ configuration, onWalletConnected }: UseContextArgs): ConnectContextContents => {
    const [ethosConfiguration, setEthosConfiguration] = useState<EthosConfiguration>({
        ...DEFAULT_CONFIGURATION,
        ...configuration
    })
    const [isModalOpen, setIsModalOpen] = useState(false);

    const init = useCallback((config: EthosConfiguration) => {
        log('EthosConnectProvider', 'EthosConnectProvider Configuration:', config)
        const fullConfiguration = {
            ...DEFAULT_CONFIGURATION,
            ...config
        }
        lib.initializeEthos(fullConfiguration)
        setEthosConfiguration((prev) => {
            if (JSON.stringify(fullConfiguration) !== JSON.stringify(prev)) {
                return fullConfiguration;
            } else {
                return prev;
            }
        })
    }, []);

    useEffect(() => {
        lib.initializeEthos(ethosConfiguration)
    }, [ethosConfiguration])

    useEffect(() => {
        if (!configuration) return;
        if (JSON.stringify(ethosConfiguration) === JSON.stringify(configuration)) return;
        init(configuration);
    }, [ethosConfiguration, configuration]);

    const _onWalletConnected = useCallback((clientAndSigner: ClientAndSigner) => {
        setIsModalOpen(false);
        onWalletConnected && onWalletConnected(clientAndSigner);
    }, [onWalletConnected]);

    const { 
        wallets, 
        connect: selectWallet, 
        clientAndSigner, 
        getState 
    } = useConnect(ethosConfiguration, _onWalletConnected)
    
    const { 
        account: { address, contents },
        altAccount,
        setAltAccount
    } = useAccount(
        clientAndSigner.signer, 
        ethosConfiguration?.network ?? DEFAULT_NETWORK, 
        ethosConfiguration?.pollingInterval,
        ethosConfiguration?.invalidPackages
    )

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
        const { client, signer } = clientAndSigner;
        const extensionState = getState();
        let status;

        if (signer?.type === 'hosted') {
            status = EthosConnectStatus.Connected
        } else if (extensionState.isConnecting) {
            status = EthosConnectStatus.Loading
        } else if (client && extensionState.isConnected) {
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
            client,
            altAccount,
            setAltAccount
        }

        if (signer && address) {
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
        altAccount,
        setAltAccount,
        clientAndSigner,
        contents,
        ethosConfiguration
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
        clientAndSigner
    }), [wallet, modal, clientAndSigner]);

    return { ...value, ethosConfiguration, init }
}

export default useContext;