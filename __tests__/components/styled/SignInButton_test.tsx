import React from 'react'
import { create, act } from 'react-test-renderer'

import SignInButton from '../../../src/components/styled/SignInButton'
import SignInModal from '../../../src/components/styled/SignInModal'
import Button from '../../../src/components/headless/Button'

describe('SignInButton', () => {
  it('renders correctly', () => {
    const rendered = create(<SignInButton />).toJSON()
    expect(rendered).toMatchSnapshot()
  })

  it('triggers the SignInModal when clicked and triggers onClick callback', () => {
    const onClick = jest.fn()
    const signInButton = create(<SignInButton onClick={onClick} />)
    const root = signInButton.root
    expect(root.findAllByProps({ isOpen: true }).length).toBe(0)
    expect(onClick.mock.calls.length).toBe(0)

    act(() => {
      root.findByType(Button).props.onClick()
    })

    expect(root.findAllByProps({ isOpen: true }).length).toBe(1)
    expect(onClick.mock.calls.length).toBe(1)
  })
})
