import React from 'react'
import { create, act } from 'react-test-renderer'

import EthosConnectProvider from '../../src/components/EthosConnectProvider'
import { Chain } from '../../src/enums/Chain'
import { EthosConfiguration } from '../../src/types/EthosConfiguration'
import lib from '../../src/lib/lib';
import { SignerType } from '../../src/types/Signer'
import sui from '../../__mocks__/sui.mock'
import { HostedSigner } from '../../src/types/Signer';
import BigNumber from 'bignumber.js';
import { DEFAULT_NETWORK } from '../../src/lib/constants';
import type { SuiSignMessageOutput, WalletAccount } from '@mysten/wallet-standard';

describe('EthosConnectProvider', () => {
  const signer = {
    type: SignerType.Hosted,
    getAddress: () => Promise.resolve("ADDRESS"),
    accounts: [] as readonly WalletAccount[],
    currentAccount: null,
    getAccounts: () => Promise.resolve([]),
    signAndExecuteTransactionBlock: (_transactionBlock) => Promise.resolve({} as any),
    requestPreapproval: (_preApproval) => Promise.resolve(true),
    signMessage: (_message) => Promise.resolve({} as SuiSignMessageOutput),
    disconnect: () => {},
    logout: () => {}
  } as HostedSigner

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
      suiBalance: new BigNumber(0),
      tokens: {},
      nfts: [],
      objects: []
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
        <EthosConnectProvider ethosConfiguration={{ apiKey: "test" }} onWalletConnected={onWalletConnected}>
          test
        </EthosConnectProvider>
      )
    })

    expect(onWalletConnected.mock.calls.length).toBe(1)
    expect(receivedProvider).toBe(sui.provider)
    expect(receivedSigner).toBe(signer)
  })

  it('should initialize default configuration if no optional values are given', async () => {
    const initialEthosConfiguration: EthosConfiguration = { apiKey: 'test-id' }
    const expectedEthosConfiguration: EthosConfiguration = {
      apiKey: 'test-id',
      walletAppUrl: 'https://ethoswallet.xyz',
      chain: Chain.Sui,
      network: DEFAULT_NETWORK
    }

    const initializeSpy = jest.spyOn(lib, 'initializeEthos')

    await act(async () => {
      create(
        <EthosConnectProvider ethosConfiguration={initialEthosConfiguration} onWalletConnected={onWalletConnected}>
          test
        </EthosConnectProvider>
      )
    })

    expect(initializeSpy).toBeCalledWith(expectedEthosConfiguration)
  });
})
