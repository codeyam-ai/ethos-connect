import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
// import {
//   WagmiConfig,
//   createClient,
//   defaultChains,
//   configureChains,
//   useAccount,
//   useProvider,
//   useSigner,
// } from 'wagmi'
// import { Provider } from '../lib/ethersWrapper/Provider'
import getProvider from '../lib/getProvider'

// import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { publicProvider } from 'wagmi/providers/public'

// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { InjectedConnector } from 'wagmi/connectors/injected'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// import { Chain } from '../enums/Chain'
import { EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'
import useSuiWallet from '../lib/useSuiWallet'
import log from '../lib/log'
import listenForMobileConnection from '../lib/listenForMobileConnection'
import { Chain } from '../enums/Chain'

export type ProviderAndSigner = {
  provider: ethers.providers.Web3Provider | any | undefined
  signer: any
}
export interface EthosWrapperProps extends React.HTMLAttributes<HTMLButtonElement> {
  ethosConfiguration: EthosConfiguration
  onProviderSelected: ({ provider, signer }: ProviderAndSigner) => void
}

const EthosWrapper = ({ ethosConfiguration, onProviderSelected, children }: EthosWrapperProps) => {
  // Set defaults
  if (!ethosConfiguration.chain) ethosConfiguration.chain = Chain.Sui;
  if (!ethosConfiguration.network) ethosConfiguration.network = 'sui';
  if (!ethosConfiguration.walletAppUrl) ethosConfiguration.walletAppUrl = 'https://ethoswallet.xyz/';

  log('EthosWrapper', 'EthosWrapper Configuration:', ethosConfiguration)

  const [providerAndSigner, setProviderAndSigner] = useState<ProviderAndSigner | null>(null)
  const suiProviderAndSigner = useSuiWallet()

  const _onProviderSelected = (providerAndSigner: ProviderAndSigner) => {
    log('EthosWrapper', '_onProviderSelected called with: ', providerAndSigner)
    setProviderAndSigner(providerAndSigner)
    onProviderSelected && onProviderSelected(providerAndSigner)
  }

  const childrenWithProviderAndSigner = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...providerAndSigner })
    }
    return child
  })

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
  }, [suiProviderAndSigner])

  return <>{childrenWithProviderAndSigner}</>
}

export default EthosWrapper
