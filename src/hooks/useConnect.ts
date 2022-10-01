import { useCallback, useEffect, useRef, useState } from 'react'
import log from '../lib/log'
import useSuiWallet from './useSuiWallet' 
import getProvider from '../lib/getProvider'
import listenForMobileConnection from '../lib/listenForMobileConnection'
import { ProviderAndSigner } from '../types/ProviderAndSigner'
import { JsonRpcProvider } from '@mysten/sui.js';
import { suiFullNode } from '../lib/constants'

const useConnect = () => {
  const signerFound = useRef<boolean>(false)
  const methodsChecked = useRef<any>({
    'ethos': false,
    // 'mobile': false,
    'extension': false
  })

  const [providerAndSigner, setProviderAndSigner] = useState<ProviderAndSigner>({
    provider: null,
    signer: null
  })
  const suiProviderAndSigner = useSuiWallet()

  const checkProviderAndSigner = useCallback((providerAndSigner: ProviderAndSigner, type?: string) => {
    log("useConnect", "trying to set providerAndSigner", type, providerAndSigner, signerFound.current, methodsChecked.current)
    if (signerFound.current) return;
    
    if (type) {
      methodsChecked.current[type] = true;
    }
    
    const allMethodsChecked = !Object.values(methodsChecked.current).includes(false)
    if (!providerAndSigner.signer && !allMethodsChecked) return;
    
    if (providerAndSigner.signer) {
      signerFound.current = true;
    }

    if (allMethodsChecked || providerAndSigner.provider) {
      providerAndSigner.provider = new JsonRpcProvider(suiFullNode);
      providerAndSigner.provider.getSigner = () => providerAndSigner.signer;
    }
    
    log("useConnect", "final setting providerAndSigner", providerAndSigner)
    setProviderAndSigner(providerAndSigner)
  }, []);

  // const updateProviderAndSigner = useCallback((updates) => {
  //   log("useConnect", "updateProviderAndSigner", updates)
  //   setProviderAndSigner(
  //     (prev: ProviderAndSigner) => ({
  //       ...prev,
  //       ...updates
  //     })
  //   )
  // }, [])

  useEffect(() => {
    log("mobile", "listening to mobile connection from EthosWrapper")
    listenForMobileConnection(
      (mobileProviderAndSigner: any) => {
        log('useConnect', 'Setting providerAndSigner mobile', mobileProviderAndSigner)
        log("mobile", "Setting provider and signer", mobileProviderAndSigner)
        checkProviderAndSigner(mobileProviderAndSigner, 'mobile')
      }
    )
  }, [checkProviderAndSigner])

  useEffect(() => {
    if (!suiProviderAndSigner) return

    log('useConnect', 'Setting providerAndSigner extension', suiProviderAndSigner)
    checkProviderAndSigner(suiProviderAndSigner, 'extension')
  }, [suiProviderAndSigner, checkProviderAndSigner])

  useEffect(() => { 
    const fetchEthosProvider = async () => {
      const provider = await getProvider()
      const signer = provider?.getSigner()
      log('useConnect', 'Setting providerAndSigner ethos', provider, signer)
      checkProviderAndSigner(
        {
          provider,
          signer
        }, 
        'ethos'
      )
    }
    
    fetchEthosProvider()
  }, [checkProviderAndSigner])

  return providerAndSigner;
}

export default useConnect;