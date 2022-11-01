import React from 'react'
import { create, act, ReactTestInstance } from 'react-test-renderer'
import { waitFor } from '@testing-library/react'

import SignInModal from '../../../src/components/styled/SignInModal'
import FallbackLogo from '../../../src/components/svg/FallbackLogo'
import lib from '../../../src/lib/lib'
import hooks from '../../../src/hooks/hooks'

const modalExists = (root: ReactTestInstance) => {
    const modal = root.findByProps({ role: 'dialog' })
    return modal.props.style.visibility !== 'hidden'
}

const expectElementWithRoleToExist = (root: any, role: string, shouldExist: boolean): void => {
    if (shouldExist) {
        expect(root.findByProps({ role })).toBeTruthy()
    } else {
        expect(() => root.findByProps({ role })).toThrow()
    }
}

beforeEach(() => {
    jest.spyOn(hooks, 'useWallet').mockReturnValue({
        wallets: [],
        selectWallet: () => {}
    })
})

describe('SignInModal', () => {
    describe('closed', () => {
        beforeEach(() =>{
            jest.spyOn(hooks, 'useModal').mockReturnValue({
                isModalOpen: false,
                openModal: () => {},
                closeModal: () => {}
            })
        })

        it('renders a hidden modal if isOpen is false', () => {
            const signInModal = create(
                <SignInModal isOpen={false} />  
            )
        
            const root = signInModal.root
            
            expect(modalExists(root)).toBeFalsy()
        
            expect(signInModal.toJSON()).toMatchSnapshot()
          })
    })

    describe('opened', () => {
        beforeEach(() =>{
            jest.spyOn(hooks, 'useModal').mockReturnValue({
                isModalOpen: true,
                openModal: () => {},
                closeModal: () => {}
            })
        })

        it('renders a visible modal if isOpen is true', () => {
            const signInModal = create(
                <SignInModal isOpen={true} />
            )

            const root = signInModal.root
            expect(modalExists(root)).toBeTruthy()

            expect(root.findAllByType(FallbackLogo).length).toBe(0)

            expect(signInModal.toJSON()).toMatchSnapshot()
        })

        it('renders email sign in if hideEmailSignIn is not true and no wallets are present', () => {
            const signInModal = create(
                <SignInModal isOpen={true} />
            )

            const root = signInModal.root
            expectElementWithRoleToExist(root, 'email-sign-in', true)
            expectElementWithRoleToExist(root, 'wallet-sign-in', false)
        })
        
        it('does NOT render email if hideEmailSignIn is true', () => {
            const signInModal = create(
                <SignInModal isOpen={true} hideEmailSignIn={true} />
            )
            
            const root = signInModal.root
            expectElementWithRoleToExist(root, 'email-sign-in', false)
        })
        
        it('does NOT render wallet if hideWalletSignIn is true', () => {
            const signInModal = create(
                <SignInModal isOpen={true} hideWalletSignIn={true} />
            )

            const root = signInModal.root
            expectElementWithRoleToExist(root, 'wallet-sign-in', false)
        })
        
        it('should throw if hideWalletSignIn and hideWalletSignIn are both true', () => {
            // Hide console error in test
            console.error = jest.fn();
            expect(() => create(
                <SignInModal isOpen={true} hideWalletSignIn={true} hideEmailSignIn={true} />
            )).toThrow()
        })

        it('sends an email if you click the send email button and the captcha is passed', async () => {
            const testEmail = 'test@example.com'

            let emailProvided
            jest.spyOn(lib, 'postIFrameMessage').mockImplementation(({ action, data }) => {
                expect(action).toBe('login')
                emailProvided = data.email
                expect(data.appId).toBe('test')
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
})
