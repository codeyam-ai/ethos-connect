import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import log from '../lib/log'
import useWalletKit from './useWalletKit'
// import listenForMobileConnection from '../lib/listenForMobileConnection'
import { ClientAndSigner } from '../types/ProviderAndSigner'
import { ExtensionSigner, HostedSigner } from 'types/Signer'
import lib from '../lib/lib'
import { EthosConfiguration } from '../types/EthosConfiguration'
import { DEFAULT_CHAIN, DEFAULT_NETWORK } from '../lib/constants';
import { WalletKitCoreConnectionStatus } from '@mysten/wallet-kit-core'
import { SuiClient } from '@mysten/sui.js/client'

const useConnect = (ethosConfiguration?: EthosConfiguration, onWalletConnected?: (clientAndSigner: ClientAndSigner) => void) => {
  const signerFound = useRef<boolean>(false)
  const methodsChecked = useRef<any>({
    'ethos': false,
    // 'mobile': false,
    'extension': false
  })

  const client = useMemo(() => {
    const network = typeof ethosConfiguration?.network === "string" ? ethosConfiguration.network : DEFAULT_NETWORK
    // const connection = new Connection({ fullnode: network })
    // return new JsonRpcProvider(connection);
    const client = new SuiClient({url: network})
    return client
  }, [ethosConfiguration])

  // const [providerAndSigner, setProviderAndSigner] = useState<ProviderAndSigner>({
  //   provider: null,
  //   signer: null
  // })

  const [clientAndSigner, setClientAndSigner] = useState<ClientAndSigner>({client: null, signer: null})

  const {
    wallets,
    status: suiStatus,
    signer: suiSigner,
    getState,
    connect
  } = useWalletKit({ 
    client,
    defaultChain: ethosConfiguration?.chain ?? DEFAULT_CHAIN, 
    preferredWallets: ethosConfiguration?.preferredWallets, 
    disableAutoConnect: ethosConfiguration?.disableAutoConnect 
  });

  const disconnect = useCallback(() => {
    signerFound.current = false;
    methodsChecked.current = {
      'ethos': false,
      // 'mobile': false,
      'extension': false
    }

    setClientAndSigner((prev) => ({
      ...prev,
      signer: null
    }));
  }, [])

  useEffect(() => {
    signerFound.current = false;
    methodsChecked.current = {
      'ethos': false,
      // 'mobile': false,
      'extension': false
    }
  }, [ethosConfiguration]);

  useEffect(() => {
    const { client, signer } = clientAndSigner;
    if (!client && !signer) return;

    const extensionState = getState();
    if (extensionState.isConnecting || extensionState.isError) return;

    onWalletConnected && onWalletConnected(clientAndSigner)
  }, [suiStatus, clientAndSigner, onWalletConnected, getState]);
  
  const checkSigner = useCallback((signer: ExtensionSigner | HostedSigner | null, type?: string) => {
    log("useConnect", "trying to set providerAndSigner", type, signerFound.current, methodsChecked.current)
    if (signerFound.current) return;

    if (type) {
      methodsChecked.current[type] = true;
    }

    const allMethodsChecked = !Object.values(methodsChecked.current).includes(false)
    if (!signer && !allMethodsChecked) return;

    signerFound.current = !!signer;

    if (signer) {
      const _disconnect = signer?.disconnect;
      signer.disconnect = () => {
        _disconnect();
        disconnect();
      }  
    }

    setClientAndSigner({ client, signer })
  }, [client, disconnect]);

  useEffect(() => {
    if (suiStatus === WalletKitCoreConnectionStatus.DISCONNECTED) {
      methodsChecked.current["extension"] = false;
      signerFound.current = false;
      setClientAndSigner((prev) => ({
        ...prev,
        signer: null
      }))
    }
  }, [suiStatus])

  useEffect(() => {
    if (!ethosConfiguration) return;

    log("mobile", "listening to mobile connection from EthosConnectProvider")
    // listenForMobileConnection(
    //   (mobileSigner: any) => {
    //     log('useConnect', 'Setting providerAndSigner mobile', mobileSigner)
    //     log("mobile", "Setting provider and signer", mobileSigner)
    //     checkSigner(mobileSigner, 'mobile')
    //   }
    // )
  }, [checkSigner, ethosConfiguration])

  useEffect(() => {
    if (!ethosConfiguration) return;

    const state = getState();
    log('useConnect', 'Setting providerAndSigner extension', state)
    if (state.isConnecting || state.isError) return

    checkSigner(suiSigner, 'extension')
  }, [suiStatus, getState, checkSigner, suiSigner, ethosConfiguration])

  useEffect(() => {
    if (!ethosConfiguration) return;

    if (!ethosConfiguration.apiKey) {
      log('useConnect', 'Setting null providerAndSigner ethos');
      checkSigner(null, 'ethos');
      return;
    }

    const fetchEthosSigner = async () => {
      const signer = await lib.getEthosSigner({ client, defaultChain: ethosConfiguration.chain ?? DEFAULT_CHAIN })
      log('useConnect', 'Setting providerAndSigner ethos', signer)
      checkSigner(signer, 'ethos');
    }

    fetchEthosSigner()
  }, [client, checkSigner, ethosConfiguration])

  return { wallets, clientAndSigner, connect, getState };
}

export default useConnect;