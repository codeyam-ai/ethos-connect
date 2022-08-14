import { act, renderHook } from '@testing-library/react-hooks'
import useConnect from '../../src/hooks/useConnect'

import * as useSuiWallet from '../../src/hooks/useSuiWallet' 
import * as getProvider from '../../src/lib/getProvider'
import * as listenForMobileConnection from '../../src/lib/listenForMobileConnection'

const nullProviderAndSigner = {
  provider: null,
  signer: null,
  contents: null
}

const provider = {
  getSigner: () => null
}

const providerNoSigner = {
  ...nullProviderAndSigner,
  provider
}

describe('useConnect', () => {
  it("should not set the provider until all methods have been checked", async () => {
    jest.spyOn(useSuiWallet, 'default').mockReturnValue(providerNoSigner)

    let resolveProvider;
    const providerPromise = new Promise((resolve, reject) => {
      resolveProvider = resolve;
    });
    jest.spyOn(getProvider, 'default').mockReturnValue(providerPromise)

    let onMobileConnect;
    jest.spyOn(listenForMobileConnection, 'default').mockImplementation(async (onConnect: any) => {
      console.log("ONCONNECT", onConnect)
      onMobileConnect = onConnect;
    })

    const { result } = renderHook(() => useConnect())
    expect(result.current.providerAndSigner).toStrictEqual(nullProviderAndSigner)

    resolveProvider(provider)
    expect(result.current.providerAndSigner).toStrictEqual(nullProviderAndSigner)

    const mobileConnectNoSigner = {
      ...nullProviderAndSigner,
      provider
    }
    await act(async () => {
      onMobileConnect(mobileConnectNoSigner)
    })
    
    expect(result.current.providerAndSigner).toStrictEqual(mobileConnectNoSigner)
  })

  it.todo("should set the provider once a provider with a signer is found")

  it.todo("should update the provider externally")
})
