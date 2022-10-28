declare global {
  interface Window {
    ethosInternal: any
  }
}

import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import Loader from '../svg/Loader'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import * as styles from './signInModalStyles'
import useHandleElementWithIdClicked from '../../lib/useHandleElementWithIdClicked'
import WalletContext from '../WalletContext'
import EmailSent from './EmailSent'
import Wallets from './Wallets'
import Email from './Email'
import Dialog from './Dialog'
import ModalWrapper from './ModalWrapper'
import InstallWallet from './InstallWallet'
import IconButton from './IconButton'
import useModal from '../../hooks/useModal'
import MobileWallet from './MobileWallet'
import Header from './Header'

export type SignInModalProps = {
    isOpen: boolean
    onClose?: () => void
    hideEmailSignIn?: boolean
    hideWalletSignIn?: boolean
}

export function showSignInModal() {
    window.ethosInternal.showSignInModal()
}

export function hideSignInModal() {
    window.ethosInternal.hideSignInModal()
}

const SignInModal = ({
    hideEmailSignIn,
    hideWalletSignIn,
}: SignInModalProps) => {
    
    const { wallets, selectWallet } = useContext(WalletContext);
    const { isModalOpen, openModal, closeModal } = useModal()
    const [isOpenAll, setIsOpenAll] = useState(isModalOpen)
    const [signingIn, setSigningIn] = useState(false)
    
    const [emailSent, setEmailSent] = useState(false)
    const { width } = useWindowDimensions()
    const captchaRef = useRef<any | null>(null)
    const closeOnClickId = 'ethos-close-on-click'

    const [showEmail, setShowEmail] = useState(false);
    const [showMobile, setShowMobile] = useState(false);
    const [showInstallWallet, setShowInstallWallet] = useState(false);

    useHandleElementWithIdClicked(closeOnClickId, closeModal)

    useEffect(() => {
        window.ethosInternal ||= {}

        window.ethosInternal.showSignInModal = () => {
            openModal()
        }

        window.ethosInternal.hideSignInModal = () => {
            closeModal()
        }

        setIsOpenAll(isModalOpen)
    }, [isModalOpen, setIsOpenAll, openModal, closeModal])

    useEffect(() => {
        if (hideEmailSignIn && hideWalletSignIn) {
            throw new Error("hideEmailSignIn and hideWalletSignIn cannot both be true");
        }
    }, [])

    // const _toggleMobile = useCallback(() => {
    //     setShowMobile((prev) => !prev)
    // }, [])

    const _toggleInstallWallet = useCallback(() => {
        setShowInstallWallet((prev) => !prev)
    }, [])

    const _toggleEmail = useCallback(() => {
        setShowEmail((prev) => !prev)
    }, [])

    const _reset = useCallback(() => {
        setShowInstallWallet(false)
        setShowMobile(false)
        setShowEmail(false)
    }, [])

    const modalContent = useMemo(() => {
        const safeWallets = wallets || []

        if (showMobile) {
            return <MobileWallet />
        }

        if (showInstallWallet || (hideEmailSignIn && safeWallets.length === 0)) {
            return <InstallWallet width={width} />
        }

        if (hideWalletSignIn) {
            return (
                <Email 
                    setSigningIn={setSigningIn}
                    setEmailSent={setEmailSent}
                    captchaRef={captchaRef}
                    width={width}
                />
            )
        }

        if (!showEmail && safeWallets.length > 0) return (
            <Header
                title={<>Log in to <span style={styles.highlighted()}>Sui 8192</span></>}
                subTitle="Choose from your connected wallets"
            >
                <Wallets
                    wallets={safeWallets}
                    selectWallet={selectWallet}
                    width={width}
                />
                {!hideEmailSignIn && (
                    <>
                        <div style={styles.strikeThroughOrContainer()}>
                            <div style={styles.strikeThroughOr()}>
                                or
                            </div>
                        </div>
                        
                        <IconButton
                            text="Sign In With Email"
                            onClick={_toggleEmail}
                            width={width}
                            primary={true}
                        />
                    </>
                )}
            </Header>
        )

        return (
            <>
                <Email 
                    setSigningIn={setSigningIn}
                    setEmailSent={setEmailSent}
                    captchaRef={captchaRef}
                    width={width}
                />

                {/* <div style={{ margin: '16px 0 16px 0' }}>
                    <span style={styles.secondaryHeaderText()}>or</span>
                </div>
                
                <IconButton
                    icon={<></>}
                    text="Connect A Mobile Wallet"
                    onClick={_toggleMobile}
                    width={width}
                /> */}

                <div style={{ margin: '16px 0 16px 0' }}>
                    <span style={styles.secondaryHeaderText()}>or</span>
                </div>

                <IconButton
                    icon={<></>}
                    text="Install A Wallet"
                    onClick={_toggleInstallWallet}
                    width={width}
                />
            </>
        )
    }, [hideEmailSignIn, hideWalletSignIn, wallets, showEmail, showMobile, showInstallWallet])

    const subpage = useMemo(() => {
        return showMobile || showInstallWallet
    }, [showMobile, showInstallWallet])

    const loader = useMemo(() => (
        <div style={styles.loaderStyle()}>
            <Loader width={50} />
        </div>
    ), [])

    return (
        <Dialog isOpenAll={isOpenAll}>
            <ModalWrapper
                closeOnClickId={closeOnClickId}
                onClose={closeModal}
                isOpenAll={isOpenAll}
                width={width}
                back={subpage ? _reset : null}
            >
                {emailSent ? (
                    <EmailSent />
                ) : (
                    <div style={styles.modalContent(width)}>
                        {signingIn ? loader :  modalContent}
                    </div>
                )}
            </ModalWrapper>
        </Dialog>
    )
}

export default SignInModal
