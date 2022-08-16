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
import getConfiguration from '../../lib/getConfiguration'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { Breakpoints } from '../../enums/Breakpoints'
import connectSui from '../../lib/connectSui'
import event from '../../lib/event'
import ReCAPTCHA from "react-google-recaptcha";
import { captchaSiteKey } from '../../lib/constants';
import generateQRCode from '../../lib/generateQRCode'
import listenForMobileConnection from '../../lib/listenForMobileConnection'
import getMobileConnectionUrl from '../../lib/getMobileConnetionUrl'
import log from '../../lib/log'

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
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
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

  const connectEthos = () => {
    setMissingMessage(null)
    setWalletOption('ethos')
    setMissingMessage(<div className='missing-message'>
      Please apply for the <a
        href={`${walletAppUrl}/extensions`}
        style={selfCustodialLink()}
        target="_blank"
        rel="noopener noreferrer"
      >
        waitlist
      </a>.
    </div>)
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
    const connected = await connectSui()
    if (!connected) {
      setMissingMessage(<div className='missing-message'>
        Please install the <a
          href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
          style={selfCustodialLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          chrome extension
        </a> and reload this page once installed.
      </div>)
    } else {
      onClose && onClose()
    }
    event({ action: 'connect', category: 'sign_in', label: 'sui', value: connected ? 1 : 0 })
  }

  const connectEmail = () => {
    setMissingMessage(null)
    setQrCodeUrl(null)
    setWalletOption('email')
  }

  const logo = (connectorId: string) => {
    switch (connectorId) {
      case 'ethos':
        return <Ethos width={17} />
      case 'sui':
        return <Sui width={15} />
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
    <>
      <div style={dialogStyle(isOpen)} role="dialog">
        <div style={backdropStyle()} onClick={() => console.log('clicked')} />
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

        <div style={modalOuterWrapperStyle()}>
          <div style={modalInnerWrapperStyle(width)}>
            <div style={dialogPanelStyle(width, emailSent)}>
              {
                emailSent ? (
                  <div style={{ textAlign: 'center', margin: '24px' }}>
                    <div style={checkMarkCircleStyle()}>
                      <CheckMark color='#16a34a' />
                    </div>
                    <br />
                    <h3 style={registrationHeaderStyle()}>
                      Check your email
                    </h3>
                    <div style={secondaryTextStyle()}>
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
                    <div style={headerStyle()}>
                      <h3 style={titleStyle()}>Sign Up or Log In</h3>
                      <div style={closeStyle()} onClick={onClose}>
                        &#x2715;
                      </div>
                    </div>
                    <div style={mainContentStyle(width)}>
                      <div style={walletOptionsStyle(width)}>
                        <div style={walletOptionStyle(walletOption === 'email')} onClick={connectEmail}>
                          <button style={walletOptionButtonStyle()}>
                            {logo('email')}
                            Email or Social Login
                          </button>
                        </div>
                        <div style={walletOptionStyle(walletOption === 'ethos')} onClick={connectEthos}>
                          <button style={walletOptionButtonStyle()}>
                            {logo('ethos')}
                            Ethos Wallet
                          </button>
                        </div>
                        <div style={walletOptionStyle(walletOption === 'ethosMobile')} onClick={connectEthosMobile}>
                          <button style={walletOptionButtonStyle()}>
                            {logo('ethos')}
                            Ethos Wallet Mobile
                          </button>
                        </div>
                        <div style={walletOptionStyle(walletOption === 'sui')} onClick={_connectSui}>
                          <button style={walletOptionButtonStyle()}>
                            {logo('sui')}
                            Sui Test Wallet
                          </button>
                        </div>
                        {missingMessage && (
                          <div style={connectorWarning()}>
                            {missingMessage}
                          </div>
                        )}
                      </div>
                      <div style={registrationStyle(width)}>
                        {qrCodeUrl ? (
                          <div style={qrCodeStyle()}>
                            <h3 style={centeredRegistrationHeaderStyle()}>
                              Connect Mobile Wallet
                            </h3>
                            <p style={subheaderStyle()}>
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
                                <h3 style={registrationHeaderStyle()}>
                                  Sign up or log in with:
                                </h3>
                                <div style={socialLoginButtonsStyle()}>
                                  {socialLogin.indexOf('google') > -1 && (
                                    <div style={socialLoginButtonStyle()} onClick={() => loginWithSocial('google')}>
                                      <Google width={36} />
                                    </div>
                                  )}
                                  {socialLogin.indexOf('github') > -1 && (
                                    <div style={socialLoginButtonStyle()} onClick={() => loginWithSocial('github')}>
                                      <Github width={36} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            <h3 style={registrationHeaderStyle()}>
                              Sign up or log in with a link
                            </h3>
                            {signingIn ? (
                              <div style={loaderStyle()}>
                                <Loader width={50} />
                              </div>
                            ) : (
                              <>
                                <form onSubmit={onSubmit}>
                                  <input
                                    style={inputStyle()}
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                  <button style={buttonStyle(width)} type="submit">
                                    Send
                                  </button>
                                </form>
                                <div style={selfCustodialSection()}>
                                  Advanced:&nbsp;
                                  <a
                                    href={`${walletAppUrl}/extensions`}
                                    style={selfCustodialLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Chrome Extension
                                  </a>
                                  &nbsp;or&nbsp;
                                  <a
                                    href={`${walletAppUrl}/mobile`}
                                    style={selfCustodialLink()}
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
                )
              }
            </div>
          </div>
        </div >
      </div >
    </>
  )
}

/*
How to convert tailwind to inline CSS:
Paste the tailwind styless into https://tailwind-to-css.vercel.app/
Set aside the media queries
Paste that output into https://staxmanade.com/CssToReact/
Add media queries using `modalInnerWrapperStyle` as an example
*/

const secondaryTextStyle = () => (
  {
    color: "#6B7280",
    fontSize: "0.875rem",
    lineHeight: "1.25rem"
  } as React.CSSProperties
)

const dialogStyle = (isOpen: boolean) =>
({
  display: isOpen ? 'block' : 'none',
  position: 'relative',
  zIndex: '10',
} as React.CSSProperties)

const backdropStyle = () =>
// fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity
({
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
  backgroundColor: 'rgb(107 114 128 / .75)',
} as React.CSSProperties)

const modalOuterWrapperStyle = () =>
// fixed z-10 inset-0 overflow-y-auto
({
  position: 'fixed',
  zIndex: '99',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
  overflowY: 'auto',
} as React.CSSProperties)

const modalInnerWrapperStyle = (width: number): React.CSSProperties => {
  // flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0
  const styles = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    minHeight: '100%',
    padding: '1rem' /* 16px */,
    textAlign: 'center',
  }
  const sm = {
    padding: '0',
    alignItems: 'center',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

const dialogPanelStyle = (width: number, emailSent: boolean) => {
  // relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6
  const styles = {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#ffffff',
    transitionProperty: 'all',
    textAlign: 'left',
    borderRadius: '0.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  }
  const sm = {
    marginTop: '2rem',
    marginBottom: '2rem',
    width: '100%',
    maxWidth: emailSent ? '28rem' : '40rem',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

const closeStyle = () =>
({
  backgroundColor: '#F9FAFB',
  borderRadius: '100%',
  width: '24px',
  height: '24px',
  textAlign: 'center',
  color: '#A0AEBA',
  cursor: 'pointer',
} as React.CSSProperties)

const headerStyle = () =>
({
  borderBottom: '1px solid rgb(241 245 249)',
  padding: '12px',
  display: 'flex',
  justifyContent: 'space-between',
} as React.CSSProperties)

const titleStyle = () =>
({
  fontSize: '1rem',
  fontWeight: '500',
  margin: '0',
} as React.CSSProperties)

const mainContentStyle = (width: number) => {
  const styles = {
    justifyContent: 'space-between',
  }
  const sm = {
    display: 'flex',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

const checkMarkCircleStyle = () => (
  {
    display: "flex",
    margin: "auto",
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
    width: "3rem",
    height: "3rem",
    borderRadius: "9999px"
  } as React.CSSProperties)

const walletOptionsStyle = (width: number) => {
  const styles = {
    padding: '18px',
    gap: '6px',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid rgb(241 245 249)',
  }
  const sm = {
    width: '300px',
    padding: '24px 12px',
    borderRight: '1px solid rgb(241 245 249)',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

const walletOptionStyle = (selected = false) =>
({
  padding: '12px',
  backgroundColor: selected ? '#F3E8FE' : '#F9FAFB',
  borderRadius: '0.5rem',
  fontWeight: '500',
  cursor: 'pointer',
} as React.CSSProperties)

const walletOptionButtonStyle = () =>
({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  gap: '0.5rem',
  border: 'none',
  background: 'none',
  textDecoration: 'none',
} as React.CSSProperties)

const socialLoginButtonsStyle = () => ({
  padding: '12px 0',
  display: 'flex',
  gap: '6px'
})

const socialLoginButtonStyle = () => ({
  cursor: 'pointer'
})

const registrationStyle = (width: number) => {
  const styles = {
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flexGrow: '1'
  }
  const sm = {
    padding: '24px',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

const qrCodeStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
} as React.CSSProperties)

const registrationHeaderStyle = () =>
({
  fontWeight: '500',
  margin: '0',
} as React.CSSProperties)

const centeredRegistrationHeaderStyle = () =>
({
  fontWeight: '500',
  margin: '0',
  textAlign: 'center'
} as React.CSSProperties)

const subheaderStyle = () =>
({
  margin: '6px 0',
  fontSize: 'smaller',
  textAlign: 'center'
} as React.CSSProperties)

const inputStyle = () =>
({
  border: '1px solid rgb(203 213 225)',
  borderRadius: '0.5rem',
  padding: '12px',
  width: '90%',
} as React.CSSProperties)

const buttonStyle = (width: number) => {
  const styles = {
    marginTop: '0.5rem',
    border: '1px solid rgb(203 213 225)',
    borderRadius: '0.5rem',
    padding: '6px',
    backgroundColor: '#761AC7',
    color: '#FFFFFF',
    textDecoration: 'none',
    minWidth: '6rem',
  }
  const sm = {
    marginTop: '1rem',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

const loaderStyle = () =>
({
  display: 'flex',
  justifyContent: 'center',
  padding: '45px 0',
} as React.CSSProperties)

const connectorWarning = () =>
({
  fontSize: 'small',
  textAlign: 'center',
  paddingTop: '6px',
} as React.CSSProperties)

const selfCustodialSection = () =>
({
  paddingTop: '6px',
  fontSize: 'small',
  paddingLeft: '3px',
} as React.CSSProperties)

const selfCustodialLink = () =>
({
  color: '#751ac7',
  textDecoration: 'underline',
  fontWeight: 400,
} as React.CSSProperties)

export default SignInModal
