import React from 'react'
import { create, act } from 'react-test-renderer'

import SignInModal from '../../../src/components/styled/SignInModal'
import Ethos from '../../../src/components/svg/Ethos'
import * as lib from '../../../src/lib/login'
import * as getConfiguration from '../../../src/lib/getConfiguration'
import { Chain } from '../../../src/enums/Chain'

// import * as wagmi from 'wagmi'
import Metamask from '../../../src/components/svg/Metamask'
import WalletConnect from '../../../src/components/svg/WalletConnect'

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

    expect(root.findAllByType(Metamask).length).toBe(0)
    expect(root.findAllByType(WalletConnect).length).toBe(0)

    expect(signInModal.toJSON()).toMatchSnapshot()
  })

  it('shows a warning if you click the Ethos wallet button', () => {
    const warningCount = (root: any) =>
      root.findAllByProps({
        children: 'You do not have the necessary wallet extension installed.',
      }).length

    const signInModal = create(<SignInModal isOpen={true} />)

    const root = signInModal.root
    expect(warningCount(root)).toBe(0)

    const ethosWalletButton = root.findByType(Ethos)
    act(() => {
      ethosWalletButton.parent.parent.props.onClick()
    })
    expect(warningCount(root)).toBe(1)
  })

  it('sends an email if you click the send email button', async () => {
    const testEmail = 'test@example.com'

    let emailProvided
    jest.spyOn(lib, 'default').mockImplementation(({ email, provider, appId }) => {
      emailProvided = email
      expect(appId).toBe('test')
      return Promise.resolve({})
    })
    const onEmailSent = jest.fn()
    const onClose = jest.fn()

    const signInModal = create(
      <SignInModal isOpen={true} onEmailSent={onEmailSent} onClose={onClose} />
    )

    const root = signInModal.root
    const emailInput = root.findByProps({ type: 'email' })
    const emailForm = emailInput.parent

    act(() => {
      emailInput.props.onChange({ target: { value: testEmail } })
    })

    await act(async () => {
      emailForm.props.onSubmit()
    })

    expect(emailProvided).toBe(testEmail)
    expect(onEmailSent.mock.calls.length).toBe(1)
    expect(onClose.mock.calls.length).toBe(1)
  })

  // describe('Ethereum', () => {
  //   beforeEach(() => {
  //     jest.spyOn(getConfiguration, 'default').mockImplementation(() => ({
  //       walletAppUrl: 'test',
  //       appId: 'test',
  //       network: 'test',
  //       chain: Chain.Eth,
  //     }))

  //     jest.spyOn(wagmi as any, 'useConnect').mockReturnValue({
  //       connectors: [{ id: 'metaMask' }, { id: 'walletConnect' }],
  //     })
  //   })

  //   it('renders the wagmi connector buttons', () => {
  //     const signInModal = create(<SignInModal isOpen={true} />)

  //     const root = signInModal.root
  //     expect(root.findByType(Metamask)).toBeDefined()
  //     expect(root.findByType(WalletConnect)).toBeDefined()
  //     expect(signInModal.toJSON()).toMatchSnapshot()
  //   })
  // })
})
