import React from 'react'
import { create, act, ReactTestInstance } from 'react-test-renderer'
import { waitFor } from '@testing-library/react'

import SignInModal from '../../../src/components/styled/SignInModal'
import Ethos from '../../../src/components/svg/Ethos'
import FallbackLogo from '../../../src/components/svg/FallbackLogo'
import * as lib from '../../../src/lib/login'

const modalExists = (root: any) => {
  const modal = root.findByProps({ role: 'dialog' })
  return modal.props.style.display === 'block'
}

describe('SignInModal', () => {
  it('renders a hidden modal if isOpen is false', () => {
    const signInModal = create(<SignInModal isOpen={false} />)

    const root = signInModal.root
    expect(modalExists(root)).toBeFalsy()

    expect(signInModal.toJSON()).toMatchSnapshot()
  })

  it('renders a visible modal if isOpen is true', () => {
    const signInModal = create(<SignInModal isOpen={true} />)

    const root = signInModal.root
    expect(modalExists(root)).toBeTruthy()

    expect(root.findAllByType(FallbackLogo).length).toBe(0)

    expect(signInModal.toJSON()).toMatchSnapshot()
  })

  it('shows a warning if you click the Ethos wallet button and it is not installed', async () => {
    const warningCount = (root: any) =>
      root.findAllByProps({
        className: 'missing-message',
      }).length

    const signInModal = create(<SignInModal isOpen={true} />)

    const root = signInModal.root
    expect(warningCount(root)).toBe(0)

    const ethosWalletButton = root.findAllByType(Ethos)
    await act(async () => {
      ethosWalletButton[1]?.parent?.parent?.props.onClick()
    })
    expect(warningCount(root)).toBe(1)
  })

  it('sends an email if you click the send email button and the captcha is passed', async () => {
    const testEmail = 'test@example.com'

    let emailProvided
    jest.spyOn(lib, 'default').mockImplementation(({ email, provider, appId }) => {
      emailProvided = email
      expect(appId).toBe('test')
      return Promise.resolve({})
    })

    const signInModal = create(
      <SignInModal isOpen={true} onClose={() => null} />
    )

    const root = signInModal.root
    const emailInput = root.findByProps({ type: 'email' })
    const emailForm = emailInput.parent
    let captcha: ReactTestInstance
    await waitFor(() => {
      captcha = root.findByProps({ size: 'invisible' })
    });

    act(() => {
      emailInput.props.onChange({ target: { value: testEmail } })
    })

    await act(async () => {
      // Pass captcha
      captcha.props.onChange();
      emailForm?.props.onSubmit()
    })

    expect(emailProvided).toBe(testEmail)
  })

  it('should render captcha as invisible', async () => {
    const signInModal = create(
      <SignInModal isOpen={true} onClose={() => null} />
    )

    const root = signInModal.root
    let captcha: ReactTestInstance
    await waitFor(() => {
      captcha = root.findByProps({ size: 'invisible' })
      expect(captcha).toBeTruthy();
    });
  });
})
