import React from 'react'
import { create } from 'react-test-renderer'
import SignInButton from '../../../src/components/styled/SignInButton'

describe('SignInButton', () => {
  it('renders correctly', () => {
    const rendered = create(<SignInButton />).toJSON()
    expect(rendered).toMatchSnapshot()
  })
})
