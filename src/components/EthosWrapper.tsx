import React, { useCallback, useEffect, useState } from 'react'
import getProvider from '../lib/getProvider'

import { EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'
import useSuiWallet from '../lib/useSuiWallet'
import log from '../lib/log'
import listenForMobileConnection from '../lib/listenForMobileConnection'
import { Chain } from '../enums/Chain'

export type ProviderAndSigner = {
  provider: any | undefined
  signer: any
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

  log('EthosWrapper', 'EthosWrapper Configuration:', ethosConfiguration)

  const [providerAndSigner, setProviderAndSigner] = useState<ProviderAndSigner | null>(null)
  const suiProviderAndSigner = useSuiWallet()

  const _onProviderSelected = useCallback((providerAndSigner: ProviderAndSigner) => {
    log('EthosWrapper', '_onProviderSelected called with: ', providerAndSigner)
    setProviderAndSigner(providerAndSigner)
    onWalletConnected && onWalletConnected(providerAndSigner)
  }, []);

  useEffect(() => {
    listenForMobileConnection().then(
      (mobileProviderAndSigner: any) => _onProviderSelected(mobileProviderAndSigner)
    )
  }, [])

  useEffect(() => {
    if (!suiProviderAndSigner) return

    const { provider: suiProvider, signer: suiSigner } = suiProviderAndSigner
    if (suiProvider && !suiSigner) {
      initialize(ethosConfiguration)
      const fetchEthosProvider = async () => {
        const ethosProvider = await getProvider()
        log('EthosWrapper', 'Setting _onProviderSelected1')
        _onProviderSelected({
          provider: ethosProvider,
          signer: ethosProvider?.getSigner(),
        })
      }

      fetchEthosProvider()
    } else if (suiSigner) {
      log('EthosWrapper', 'Setting _onProviderSelected2')
      _onProviderSelected(suiProviderAndSigner)
    }
  }, [suiProviderAndSigner, _onProviderSelected])

  const childrenWithProviderAndSigner = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...providerAndSigner })
    }
    return child
  })

  return <>{childrenWithProviderAndSigner}</>
}

export default EthosWrapper
