import React from 'react'
import { create, act } from 'react-test-renderer'

import EthosConnectProvider from '../../src/components/EthosConnectProvider'
import { Chain } from '../../src/enums/Chain'
import { EthosConfiguration } from '../../src/types/EthosConfiguration'
import lib from '../../src/lib/lib';
import { SignerType } from '../../src/types/Signer'
import sui from '../../__mocks__/sui.mock'

describe('EthosConnectProvider', () => {
  const signer = {
    getAddress: () => Promise.resolve("ADDRESS"),
    getAccounts: () => Promise.resolve([]),
    type: SignerType.EXTENSION,
    signAndExecuteTransaction: (_transaction) => Promise.resolve({} as any),
    requestPreapproval: (_preApproval) => Promise.resolve(true),
    sign: (_message) => Promise.resolve(true),
    disconnect: () => {}
  }

  let receivedProvider
  let receivedSigner
  let onWalletConnected

  beforeEach(() => {
    jest.spyOn(lib, 'getEthosSigner').mockImplementation(() => {
      return Promise.resolve(signer)
    })

    onWalletConnected = jest.fn(({ provider: p, signer: s }) => {
      receivedProvider = p
      receivedSigner = s
    });

    jest.spyOn(lib, 'getWalletContents').mockReturnValue(Promise.resolve({
      suiBalance: 0,
      tokens: {},
      nfts: []
    }))
  })

  afterEach(() => {
    receivedProvider = null
    receivedSigner = null
  })

  it('renders nothing but the children provided', async () => {
    let ethosWrapper
    await act(async () => {
      ethosWrapper = create(
        <EthosConnectProvider ethosConfiguration={{}} onWalletConnected={onWalletConnected}>
          test
        </EthosConnectProvider>
      )
    })

    expect(ethosWrapper.toJSON()).toMatchSnapshot()
  })

  it('calls the onWalletConnected callback', async () => {
    await act(async () => {
      create(
        <EthosConnectProvider ethosConfiguration={{}} onWalletConnected={onWalletConnected}>
          test
        </EthosConnectProvider>
      )
    })

    expect(onWalletConnected.mock.calls.length).toBe(1)
    expect(receivedProvider).toBe(sui.provider)
    expect(receivedSigner).toBe(signer)
  })

  it('should initialize default configuration if no optional values are given', async () => {
    let ethosWrapper: any;
    const initialEthosConfiguration: EthosConfiguration = { appId: 'test-id' }
    const expectedEthosConfiguration: EthosConfiguration = {
      appId: 'test-id',
      walletAppUrl: 'https://ethoswallet.xyz',
      chain: Chain.Sui,
      network: 'sui'
    }

    const initializeSpy = jest.spyOn(lib, 'initializeEthos')

    await act(async () => {
      ethosWrapper = create(
        <EthosConnectProvider ethosConfiguration={initialEthosConfiguration} onWalletConnected={onWalletConnected}>
          test
        </EthosConnectProvider>
      )
    })

    expect(initializeSpy).toBeCalledWith(expectedEthosConfiguration)
  });
})
