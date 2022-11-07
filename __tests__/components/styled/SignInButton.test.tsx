import React from 'react'
import { create } from 'react-test-renderer'
import EthosConnectProvider from '../../../src/components/EthosConnectProvider'
import SignInButton from '../../../src/components/styled/SignInButton'

describe('SignInButton', () => {
  it('renders correctly', () => {
    const rendered = create(
        <EthosConnectProvider
            ethosConfiguration={{
                appId: "test"
            }}
        >
            <SignInButton />
        </EthosConnectProvider>
    ).toJSON()
    expect(rendered).toMatchSnapshot()
  })
})
