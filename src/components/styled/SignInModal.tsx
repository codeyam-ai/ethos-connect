declare global {
  interface Window {
    ethosInternal: any
  }
}

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import login from '../../lib/login'
import Ethos from '../svg/Ethos'
// import Google from '../svg/Google'
// import Github from '../svg/Github'
// import Email from '../svg/Email'
import Loader from '../svg/Loader'
// import Sui from '../svg/Sui'
// import FallbackLogo from '../svg/FallbackLogo'
import CheckMark from '../svg/CheckMark'
// import NoticeIcon from '../svg/NoticeIcon'
import getConfiguration from '../../lib/getConfiguration'
import useWindowDimensions from '../../hooks/useWindowDimensions'
// import connectSui from '../../lib/connectSui'
import event from '../../lib/event'
import ReCAPTCHA from 'react-google-recaptcha'
import { captchaSiteKey } from '../../lib/constants'
// import generateQRCode from '../../lib/generateQRCode'
// import listenForMobileConnection from '../../lib/listenForMobileConnection'
// import getMobileConnectionUrl from '../../lib/getMobileConnetionUrl'
// import log from '../../lib/log'
import * as styles from './signInModalStyles'
import FontProvider from './FontProvider'
import useHandleElementWithIdClicked from '../../lib/useHandleElementWithIdClicked'
import WalletContext from '../WalletContext'

export type SignInModalProps = {
    isOpen: boolean
    // socialLogin?: string[]
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
    isOpen,
    onClose,
    // socialLogin = [],
    hideEmailSignIn,
    hideWalletSignIn,
}: SignInModalProps) => {
    const { wallets, selectWallet } = useContext(WalletContext);
    const [isOpenAll, setIsOpenAll] = useState(isOpen)
    const [loading, setLoading] = useState(true)
    // const [missingMessage, setMissingMessage] = useState<any | null>(null)
    const [signingIn, setSigningIn] = useState(false)
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const { width } = useWindowDimensions()
    const { appId } = getConfiguration()
    const captchaRef = useRef<any | null>(null)
    // const [qrCodeUrl, setQrCodeUrl] = useState<string | undefined>(undefined)
    // const [walletOption, setWalletOption] = useState<string>('email')
    const closeOnClickId = 'ethos-close-on-click'

    const _onClose = useCallback(() => {
        setIsOpenAll(false)
        onClose && onClose()
    }, [])

    useHandleElementWithIdClicked(closeOnClickId, _onClose)

    const onSubmit = async () => {
        setSigningIn(true)
        if (captchaRef && captchaRef.current && process.env.NODE_ENV !== 'development') {
            try {
                await captchaRef.current.execute()
            } catch (e) {
                console.log('CAPTCHA ERROR', e)
                sendEmail()
            }
        } else {
            sendEmail()
        }
    }

    const sendEmail = async () => {
        await login({ email, appId })
        setEmail('')
        setSigningIn(false)
        setEmailSent(true)
        event({ action: 'send_email', category: 'sign_in', label: email, value: 1 })
    }

    // const loginWithSocial = (provider: string) => {
    //     login({ provider, appId })
    // }

    const _connectExtension = useCallback((e) => {
        if (!selectWallet) return;

        let element = e.target;
        let name;
        while (!name && element.parentNode) {
            name = element.dataset.name;
            element = element.parentNode;
        }
        selectWallet(name);
    }, []);

    // const connectEmail = () => {
    //     setMissingMessage(null)
    //     setQrCodeUrl(undefined)
    //     setWalletOption('email')
    // }

    // const logo = (connectorId: string) => {
    //     switch (connectorId) {
    //         case 'ethos':
    //             return <Ethos width={17} color="#5B5D5F" />
    //         case 'sui':
    //             return <Sui width={15} color="#5B5D5F" />
    //         case 'email':
    //             return <Email width={21} />
    //         default:
    //             return <FallbackLogo width={17} />
    //     }
    // }

    const icon = (src?: string) => {
        if (!src || src.startsWith("chrome-extension")) return <></>;

        return (
            <img src={src} height={30} width={30} />
        )
    }

    useEffect(() => {
        window.ethosInternal ||= {}

        window.ethosInternal.showSignInModal = () => {
            setIsOpenAll(true)
        }

        window.ethosInternal.hideSignInModal = () => {
            _onClose()
        }

        setIsOpenAll(isOpen)
    }, [isOpen, setIsOpenAll, _onClose])

    useEffect(() => {
        if (hideEmailSignIn && hideWalletSignIn) {
        throw new Error("hideEmailSignIn and hideWalletSignIn cannot both be true");
        }
        setLoading(false)
    }, [])

  return (
    <FontProvider>
      <div style={styles.dialog(isOpenAll)} role="dialog">
        <div style={styles.backdrop(isOpenAll)} />
        {!loading && (
          <ReCAPTCHA
            sitekey={captchaSiteKey}
            ref={captchaRef}
            size="invisible"
            onChange={sendEmail}
          />
        )}

        <div style={styles.modalOuterWrapper(isOpenAll)}>
          <div id={closeOnClickId} style={styles.modalInnerWrapper(width)}>
            <div style={styles.dialogPanel(width)}>
              {emailSent ? (
                <div style={{ textAlign: 'center', margin: '24px' }}>
                  <div style={styles.checkMarkCircleStyle()}>
                    <CheckMark color="#16a34a" />
                  </div>
                  <br />
                  <h3 style={styles.registrationHeaderStyle()}>Check your email</h3>
                  <div style={styles.secondaryText()}>
                    <p style={{ padding: '12px' }}>
                      An email has been sent to you with a link to login.
                    </p>
                    <p>
                      If you don&#39;t receive it, please check your spam folder or contact us at:
                    </p>
                    <p style={{ justifyContent: 'center', paddingTop: '12px' }}>
                      support@ethoswallet.xyz
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ height: '36px' }}>
                    <span style={styles.closeStyle()} onClick={_onClose}>
                      &#x2715;
                    </span>
                  </div>
                  <div style={styles.modalContent(width)}>
                    <span style={styles.secondaryHeaderText()}>Sign in with</span>
                    <h2 style={{ margin: '0' }}>
                      <span style={{ display: 'inline-flex' }}>
                        <Ethos width={20} />
                        <span style={styles.ethosWalletTitleText()}>Ethos Wallet</span>
                      </span>
                    </h2>
                    {signingIn ? (
                      <div style={styles.loaderStyle()}>
                        <Loader width={50} />
                      </div>
                    ) : (
                      <>
                        {!hideEmailSignIn && (
                          <div role="email-sign-in">
                            <div style={{ marginTop: '16px' }}>
                              <span style={styles.signInOptionSubtitleText()}>
                                Sign in with your email
                              </span>
                            </div>
                            <form onSubmit={onSubmit}>
                              <input
                                style={styles.emailInput()}
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <button style={styles.signInButton(width)} type="submit">
                                Sign In
                              </button>
                            </form>
                            {
                              // Don't show "or" unless wallet sign in is also available
                              !hideWalletSignIn && (
                                <div style={{ margin: '16px 0 16px 0' }}>
                                  <span style={styles.secondaryHeaderText()}>or</span>
                                </div>
                              )
                            }
                          </div>
                        )}
                        {!hideWalletSignIn && (
                          <div role="wallet-sign-in">
                            <span style={styles.signInOptionSubtitleText()}>
                              Connect an existing wallet
                            </span>
                            <div style={styles.walletOptionContainer(width)}>
                                {wallets?.map(
                                    (wallet, index) => (
                                        <button
                                            key={`wallet-${index}`}
                                            style={styles.walletOptionButton(width)}
                                            data-name={wallet.name}
                                            onClick={_connectExtension}
                                        >
                                            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            {icon(wallet.icon)}
                                            <span style={styles.walletOptionText()}>{wallet.name}</span>
                                            </span>
                                        </button>
                                    )
                                )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </FontProvider>
  )
}

export default SignInModal
