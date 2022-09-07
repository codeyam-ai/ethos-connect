import React, { useEffect, useRef, useState } from 'react'
import login from '../../lib/login'
import Ethos from '../svg/Ethos'
import Google from '../svg/Google'
import Github from '../svg/Github'
import Email from '../svg/Email'
import Loader from '../svg/Loader'
import Sui from '../svg/Sui'
import FallbackLogo from '../svg/FallbackLogo'
import CheckMark from '../svg/CheckMark'
import NoticeIcon from '../svg/NoticeIcon'
import getConfiguration from '../../lib/getConfiguration'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import connectSui from '../../lib/connectSui'
import event from '../../lib/event'
import ReCAPTCHA from "react-google-recaptcha";
import { captchaSiteKey } from '../../lib/constants';
import generateQRCode from '../../lib/generateQRCode'
import listenForMobileConnection from '../../lib/listenForMobileConnection'
import getMobileConnectionUrl from '../../lib/getMobileConnetionUrl'
import log from '../../lib/log'
import * as styles from './signInModalStyles';
import FontProvider from './FontProvider'

export type SignInModalProps = {
  isOpen: boolean
  socialLogin?: string[]
  onClose?: () => void
}

const SignInModal = ({ isOpen, onClose, socialLogin = [] }: SignInModalProps) => {
  const [loading, setLoading] = useState(true);
  const [missingMessage, setMissingMessage] = useState<any | null>(null)
  const [signingIn, setSigningIn] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false);
  const { width } = useWindowDimensions()
  const { appId, walletAppUrl } = getConfiguration()
  const captchaRef = useRef<any | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | undefined>(undefined);
  const [walletOption, setWalletOption] = useState<string>("email")

  const onSubmit = async () => {
    setSigningIn(true)
    if (captchaRef && captchaRef.current && process.env.NODE_ENV !== 'development') {
      try {
        await captchaRef.current.execute();
      } catch (e) {
        console.log("CAPTCHA ERROR", e);
        sendEmail();
      }
    } else {
      sendEmail();
    }
  }

  const sendEmail = async () => {
    await login({ email, appId })
    setEmail('')
    setSigningIn(false)
    setEmailSent(true);
    event({ action: 'send_email', category: 'sign_in', label: email, value: 1 })
  }

  const loginWithSocial = (provider: string) => {
    login({ provider, appId })
  }

  const connectEthos = async () => {
    setMissingMessage(null)
    setWalletOption('ethos')
    const connected = await connectSui('ethosWallet')
    if (!connected) {
      setMissingMessage(<div className='missing-message' style={styles.missingMessage()}>
        <NoticeIcon />
        <span style={{ maxWidth: "220px" }}>
          <a
            href={`${walletAppUrl}/extensions`}
            style={styles.selfCustodialLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the waitlist
          </a>
          &nbsp;for early access to the Ethos Wallet extension.
        </span>
      </div>)
    } else {
      onClose && onClose()
    }
    event({ action: 'connect', category: 'sign_in', label: 'ethos', value: connected ? 1 : 0 })
  }

  const connectEthosMobile = async () => {
    setMissingMessage(null)
    setWalletOption('ethosMobile')
    const { connectionUrl } = await getMobileConnectionUrl();
    const _qrCodeUrl = await generateQRCode(connectionUrl)
    setQrCodeUrl(_qrCodeUrl)
    listenForMobileConnection(() => {
      log("mobile", "Listening to mobile connection from SignInModal")
      onClose && onClose();
    });
  }

  const _connectSui = async () => {
    setMissingMessage(null)
    setWalletOption('sui')
    const connected = await connectSui('suiWallet')
    if (!connected) {
      setMissingMessage(<div className='missing-message' style={styles.missingMessage()}>
        <NoticeIcon />
        <span style={{ maxWidth: "220px" }}>
          Install the&nbsp;
          <a
            href={`https://docs.sui.io/explore/wallet-browser`}
            style={styles.selfCustodialLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sui Wallet extension
          </a>
          &nbsp;to connect.
        </span>
      </div>)
    } else {
      onClose && onClose()
    }
    event({ action: 'connect', category: 'sign_in', label: 'sui', value: connected ? 1 : 0 })
  }

  const connectEmail = () => {
    setMissingMessage(null)
    setQrCodeUrl(undefined)
    setWalletOption('email')
  }

  const logo = (connectorId: string) => {
    switch (connectorId) {
      case 'ethos':
        return <Ethos width={17} color='#5B5D5F' />
      case 'sui':
        return <Sui width={15} color='#5B5D5F' />
      case 'email':
        return <Email width={21} />
      default:
        return <FallbackLogo width={17} />
    }
  }

  useEffect(() => {
    setLoading(false)
  }, []);

  return (
    <FontProvider>
      <div style={styles.dialog(isOpen)} role="dialog">
        <div style={styles.backdrop()} onClick={() => console.log('clicked')} />
        {
          !loading && (
            <ReCAPTCHA
              sitekey={captchaSiteKey}
              ref={captchaRef}
              size='invisible'
              onChange={sendEmail}
            />
          )
        }

        <div style={styles.modalOuterWrapper()}>
          <div style={styles.modalInnerWrapper(width)}>
            <div style={styles.dialogPanel(width)}>
              {
                emailSent ? (
                  <div style={{ textAlign: 'center', margin: '24px' }}>
                    <div style={styles.checkMarkCircleStyle()}>
                      <CheckMark color='#16a34a' />
                    </div>
                    <br />
                    <h3 style={styles.registrationHeaderStyle()}>
                      Check your email
                    </h3>
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
                      <span style={styles.closeStyle()} onClick={onClose}>
                        &#x2715;
                      </span>
                    </div>
                    <div style={styles.modalContent(width)}>
                      <span style={styles.secondaryHeaderText()}>
                        Sign in with
                      </span>
                      <h2 style={{ margin: '0' }}>
                        <span style={{ display: 'inline-flex' }}>
                          <Ethos width={20} />
                          <span style={styles.ethosWalletTitleText()}>
                            Ethos Wallet
                          </span>
                        </span>
                      </h2>
                      {signingIn ? (
                        <div style={styles.loaderStyle()}>
                          <Loader width={50} />
                        </div>
                      ) : (
                        <>
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
                          <div style={{ margin: '16px 0 16px 0' }}>
                            <span style={styles.secondaryHeaderText()}>
                              or
                            </span>
                          </div>
                          <span style={styles.signInOptionSubtitleText()}>
                            Connect an existing wallet
                          </span>
                          {missingMessage && (
                            <div style={styles.connectorWarning()}>
                              {missingMessage}
                            </div>
                          )}
                          <div style={styles.walletOptionContainer(width)}>
                            <button
                              style={styles.walletOptionButton(width)}
                              onClick={connectEthos}
                            >
                              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                {logo('ethos')}
                                <span style={styles.walletOptionText()}>
                                  Ethos Wallet
                                </span>
                              </span>
                            </button>
                            <button
                              style={styles.walletOptionButton(width)}
                              onClick={_connectSui}
                            >
                              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                {logo('sui')}
                                <span style={styles.walletOptionText()}>
                                  Sui Wallet
                                </span>
                              </span>
                            </button>
                          </div>
                          {/* <button style={styles.learnMoreButton(width)}>
                            Learn more →
                          </button> */}
                        </>
                      )
                      }
                    </div>
                  </>
                )
              }
              {false && (
                <>
                  <div style={styles.headerStyle()}>
                    <h3 style={styles.titleStyle()}>Sign Up or Log In!!!</h3>
                    <div style={styles.closeStyle()} onClick={onClose}>
                      &#x2715;
                    </div>
                  </div>
                  <div style={styles.mainContentStyle(width)}>
                    <div style={styles.walletOptionsStyle(width)}>
                      <div style={styles.walletOptionStyle(walletOption === 'email')} onClick={connectEmail}>
                        <button style={styles.walletOptionButtonStyle()}>
                          {logo('email')}
                          Email or Social Login
                        </button>
                      </div>
                      <div style={styles.walletOptionStyle(walletOption === 'ethos')} onClick={connectEthos}>
                        <button style={styles.walletOptionButtonStyle()}>
                          {logo('ethos')}
                          Ethos Wallet
                        </button>
                      </div>
                      <div style={styles.walletOptionStyle(walletOption === 'ethosMobile')} onClick={connectEthosMobile}>
                        <button style={styles.walletOptionButtonStyle()}>
                          {logo('ethos')}
                          Ethos Wallet Mobile
                        </button>
                      </div>
                      <div style={styles.walletOptionStyle(walletOption === 'sui')} onClick={_connectSui}>
                        <button style={styles.walletOptionButtonStyle()}>
                          {logo('sui')}
                          Sui Test Wallet
                        </button>
                      </div>
                      {missingMessage && (
                        <div style={styles.connectorWarning()}>
                          {missingMessage}
                        </div>
                      )}
                    </div>
                    <div style={styles.registrationStyle(width)}>
                      {qrCodeUrl ? (
                        <div style={styles.qrCodeStyle()}>
                          <h3 style={styles.centeredRegistrationHeaderStyle()}>
                            Connect Mobile Wallet
                          </h3>
                          <p style={styles.subheaderStyle()}>
                            Scan the QR code with a mobile device.
                          </p>
                          <div>
                            <img src={qrCodeUrl} />
                          </div>
                        </div>
                      ) : (
                        <>
                          {(socialLogin || []).length > 0 && (
                            <div>
                              <h3 style={styles.registrationHeaderStyle()}>
                                Sign up or log in with:
                              </h3>
                              <div style={styles.socialLoginButtonsStyle()}>
                                {socialLogin.indexOf('google') > -1 && (
                                  <div style={styles.socialLoginButtonStyle()} onClick={() => loginWithSocial('google')}>
                                    <Google width={36} />
                                  </div>
                                )}
                                {socialLogin.indexOf('github') > -1 && (
                                  <div style={styles.socialLoginButtonStyle()} onClick={() => loginWithSocial('github')}>
                                    <Github width={36} />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          <h3 style={styles.registrationHeaderStyle()}>
                            Sign up or log in with a link
                          </h3>
                          {signingIn ? (
                            <div style={styles.loaderStyle()}>
                              <Loader width={50} />
                            </div>
                          ) : (
                            <>
                              {/* <form onSubmit={onSubmit}>
                                <input
                                  style={styles.emailInput()}
                                  type="email"
                                  placeholder="Email address"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                <button style={styles.signInButton(width)} type="submit">
                                  Send
                                </button>
                              </form> */}
                              <div style={styles.selfCustodialSection()}>
                                Advanced:&nbsp;
                                <a
                                  href={`${walletAppUrl}/extensions`}
                                  style={styles.selfCustodialLink()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Chrome Extension
                                </a>
                                &nbsp;or&nbsp;
                                <a
                                  href={`${walletAppUrl}/mobile`}
                                  style={styles.selfCustodialLink()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Mobile App
                                </a>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div >
      </div >
    </FontProvider>
  )
}

export default SignInModal
