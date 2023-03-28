import React from 'react'
import { act, create } from 'react-test-renderer'
import EthosConnectProvider from '../../../src/components/EthosConnectProvider'
import SignInButton from '../../../src/components/styled/SignInButton'
import WorkingButton from '../../../src/components/headless/WorkingButton'

describe('SignInButton', () => {
  it('renders correctly', () => {
    const rendered = create(
        <EthosConnectProvider
            ethosConfiguration={{
                apiKey: "test"
            }}
        >
            <SignInButton />
        </EthosConnectProvider>
    ).toJSON()
    expect(rendered).toMatchSnapshot()
  })

  it('opens the sign in modal', async () => {
    const rendered = create(
        <EthosConnectProvider
            ethosConfiguration={{
                apiKey: "test"
            }}
        >
            <SignInButton />
        </EthosConnectProvider>
    )

    await act(async () => {
      rendered.root.findByType(WorkingButton).props.onClick();
    })

    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
