import React, { useCallback, useEffect, useRef, useState } from 'react'
import getProvider from '../lib/getProvider'

import { EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'
import useSuiWallet from '../hooks/useSuiWallet'
import log from '../lib/log'
import listenForMobileConnection from '../lib/listenForMobileConnection'
import { Chain } from '../enums/Chain'
import ProviderAndSignerContext from './ProviderAndSignerContext'
import useAccount from '../hooks/useAccount'

export type ProviderAndSigner = {
  provider: any | null
  signer: any | null
  contents: any | null
}
export interface EthosWrapperProps extends React.HTMLAttributes<HTMLButtonElement> {
  ethosConfiguration: EthosConfiguration
  onWalletConnected: ({ provider, signer }: ProviderAndSigner) => void
}

const EthosWrapper = ({ ethosConfiguration, onWalletConnected, children }: EthosWrapperProps) => {
  // Set defaults
  if (!ethosConfiguration.chain) ethosConfiguration.chain = Chain.Sui;
  if (!ethosConfiguration.network) ethosConfiguration.network = 'sui';
  if (!ethosConfiguration.walletAppUrl) ethosConfiguration.walletAppUrl = 'https://ethoswallet.xyz/';

  const signerFound = useRef<boolean>(false)
  const methodsChecked = useRef<any>({
    'ethos': false,
    'mobile': false,
    'extension': false
  })

  log('EthosWrapper', 'EthosWrapper Configuration:', ethosConfiguration)

  const [providerAndSigner, setProviderAndSigner] = useState<ProviderAndSigner>({
    provider: null,
    signer: null,
    contents: null
  })
  const suiProviderAndSigner = useSuiWallet()
  const account = useAccount(providerAndSigner)

  const _onProviderSelected = useCallback((providerAndSigner: ProviderAndSigner, type?: string) => {
    if (signerFound.current) return;
    
    if (type) {
      methodsChecked.current[type] = true;
    }
    
    const allMethodsChecked = !Object.values(methodsChecked.current).includes(false)
    if (!providerAndSigner.signer && !allMethodsChecked) return;
    
    if (providerAndSigner.signer) {
      signerFound.current = true;
    }

    setProviderAndSigner(providerAndSigner)
    onWalletConnected && onWalletConnected(providerAndSigner)
  }, []);

  useEffect(() => {
    initialize(ethosConfiguration)
  }, [])

  useEffect(() => {
    log("mobile", "listening to mobile connection from EthosWrapper")
    listenForMobileConnection(
      (mobileProviderAndSigner: any) => {
        log('EthosWrapper', 'Setting _onProviderSelected1')
        log("mobile", "Setting provider and signer", mobileProviderAndSigner)
        _onProviderSelected(mobileProviderAndSigner, 'mobile')
      }
    )
  }, [])

  useEffect(() => {
    if (!suiProviderAndSigner) return

    log('EthosWrapper', 'Setting _onProviderSelected2')
    _onProviderSelected(suiProviderAndSigner, 'extension')
  }, [suiProviderAndSigner, _onProviderSelected])

  useEffect(() => { 
    const fetchEthosProvider = async () => {
      const ethosProvider = await getProvider()
      log('EthosWrapper', 'Setting _onProviderSelected3')
      _onProviderSelected({
        provider: ethosProvider,
        signer: ethosProvider?.getSigner(),
        contents: null
      }, 
      'ethos'
    )}

    fetchEthosProvider()
  }, [])

  useEffect(() => {
    if (!account) return;
    
    setProviderAndSigner(
      (prev: ProviderAndSigner) => ({
        ...prev,
        contents: account.contents
      })
    )
  }, [account])

  const childrenWithProviderAndSigner = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...providerAndSigner })
    }
    return child
  })
  
  return (
    <ProviderAndSignerContext.Provider value={providerAndSigner}>
      {childrenWithProviderAndSigner}
    </ProviderAndSignerContext.Provider>
  ) 
}

export default EthosWrapper
