import React from 'react'
import { create } from 'react-test-renderer'
import EthosWrapper from '../../../src/components/EthosWrapper'
import SignInButton from '../../../src/components/styled/SignInButton'

describe('SignInButton', () => {
  it('renders correctly', () => {
    const rendered = create(
        <EthosWrapper
            ethosConfiguration={{
                appId: "test"
            }}
        >
            <SignInButton />
        </EthosWrapper>
    ).toJSON()
    expect(rendered).toMatchSnapshot()
  })
})
