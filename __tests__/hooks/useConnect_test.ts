import { JsonRpcProvider } from '@mysten/sui.js'
import { act, renderHook } from '@testing-library/react-hooks'
import useConnect from '../../src/hooks/useConnect'

import * as useSuiWallet from '../../src/hooks/useSuiWallet' 
import { suiFullNode } from '../../src/lib/constants'
import * as getProvider from '../../src/lib/getProvider'
import * as listenForMobileConnection from '../../src/lib/listenForMobileConnection'

const nullProviderAndSigner = {
  provider: null,
  signer: null
}

const emptyProvider = {
  getSigner: () => null
}

const providerNoSigner = {
  ...nullProviderAndSigner,
  provider: emptyProvider
}

const signer = {
  getAddress: Promise.resolve("ADDRESS")
}

const providerWithSigner = new JsonRpcProvider(suiFullNode) as any;
providerWithSigner.getSigner = () => signer

const providerAndSigner = {
  ...nullProviderAndSigner,
  provider: providerWithSigner,
  signer
}

const setProviderAndSigner = jest.fn()

describe('useConnect', () => {
  let resolveProvider, onMobileConnect;

  beforeEach(() => {
    resolveProvider = null;
    onMobileConnect = null;

    jest.spyOn(useSuiWallet, 'default').mockReturnValue({ providerAndSigner: providerNoSigner, setProviderAndSigner })

    jest.spyOn(getProvider, 'default').mockReturnValue(new Promise((resolve, reject) => {
      resolveProvider = resolve;
    }));

    jest.spyOn(listenForMobileConnection, 'default').mockImplementation(async (onConnect: any) => {
      onMobileConnect = onConnect;
    })
  })
  
  it("should not set the provider until all methods have been checked", async () => {
    const { result } = renderHook(() => useConnect())

    expect(result.current.providerAndSigner).toStrictEqual(nullProviderAndSigner)

    await act(async () => {
      resolveProvider(emptyProvider)
    })
    // expect(result.current).toStrictEqual(providerNoSigner)

    await act(async () => {
      onMobileConnect(providerNoSigner)
    })
    expect(result.current.providerAndSigner).toStrictEqual(providerNoSigner)
  })

  it("should set the provider once a provider with a signer is found", async () => {
    const { result } = renderHook(() => useConnect())
    expect(result.current.providerAndSigner).toStrictEqual(nullProviderAndSigner)
    await act(async () => {
      resolveProvider(providerWithSigner)
    })
    // Can't figure out how to match against the JsonRpcProvider...
    expect(result.current.toString()).toBe(providerAndSigner.toString())
  })
})
