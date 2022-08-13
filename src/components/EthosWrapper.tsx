import React, { useCallback, useEffect, useRef, useState } from 'react'
import getProvider from '../lib/getProvider'

import { EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'
import useSuiWallet from '../lib/useSuiWallet'
import log from '../lib/log'
import listenForMobileConnection from '../lib/listenForMobileConnection'
import { Chain } from '../enums/Chain'
import ProviderAndSignerContext from './ProviderAndSignerContext'

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

  const _onProviderSelected = useCallback((providerAndSigner: ProviderAndSigner, type: string) => {
    log('EthosWrapper', '_onProviderSelected called with: ', type, providerAndSigner)

    methodsChecked.current[type] = true;
    if (Object.values(methodsChecked.current).includes(false)) return;

    setProviderAndSigner(providerAndSigner)
    onWalletConnected && onWalletConnected(providerAndSigner)
  }, []);

  useEffect(() => {
    listenForMobileConnection().then(
      (mobileProviderAndSigner: any) => {
        log('EthosWrapper', 'Setting _onProviderSelected1')
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
    initialize(ethosConfiguration)
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
    const listener = async (message: any) => {
      if (message.origin === ethosConfiguration.walletAppUrl) {
        const { action, data } = message.data
        if (action === 'account') {
          const { account } = data;
          const address = await providerAndSigner.signer?.getAddress();
          if (account && address && address === account.address) {
            log('EthosWrapper', 'Setting _onProviderSelected4')
            _onProviderSelected({
              ...providerAndSigner,
              contents: account.contents
            }, 'ethos')
          }
        }
      }
    }
    window.addEventListener('message', listener)

    return () => window.removeEventListener('account', listener)
  }, [providerAndSigner])

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
