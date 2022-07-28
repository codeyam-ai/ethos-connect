import React, { useState } from 'react'
import login from '../../lib/login'
import WalletConnect from '../svg/WalletConnect'
import Ethos from '../svg/Ethos'
import Metamask from '../svg/Metamask'
import Google from '../svg/Google'
import Loader from '../svg/Loader'
import getConfiguration from '../../lib/getConfiguration'
// import { useConnect } from 'wagmi'
// import { Chain } from '../../enums/Chain'
import Sui from '../svg/Sui'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { Breakpoints } from '../../enums/Breakpoints'
import connectSui from '../../lib/connectSui'
import event from '../../lib/event'

export type SignInModalProps = {
  isOpen: boolean
  onClose?: () => void
  onEmailSent?: () => void
}

const SignInModal = ({ isOpen, onClose, onEmailSent }: SignInModalProps) => {
  const { width } = useWindowDimensions()

  const { appId, walletAppUrl } = getConfiguration()
  // const eth = chain === Chain.Eth

  const [showMissingMessage, setShowMissingMessage] = useState<boolean>(false)
  const [signingIn, setSigningIn] = useState(false)
  const [email, setEmail] = useState('')

  // const { connect, connectors, error, isLoading, pendingConnector } = eth
  //   ? useConnect()
  //   : {
  //       connect: null,
  //       connectors: [],
  //       error: null,
  //       isLoading: false,
  //       pendingConnector: null,
  //     }

  const sendEmail = async () => {
    setSigningIn(true)
    await login({ email, appId })
    setEmail('')
    onEmailSent && onEmailSent()
    onClose && onClose()
    setSigningIn(false)
    event({ action: 'send_email', category: 'sign_in', label: email, value: 1})
  }

  const loginWithGoogle = () => {
    login({ provider: 'google', appId })
  }

  const connectEthos = () => {
    setShowMissingMessage(true)
  }

  const _connectSui = async () => {
    const connected = await connectSui()
    if (!connected) {
      setShowMissingMessage(true)
    } else {
      onClose && onClose()
    }
    event({ action: 'connect', category: 'sign_in', label: 'sui', value: connected ? 1: 0})
  }

  const logo = (connectorId: string) => {
    switch (connectorId) {
      case 'metaMask':
        return <Metamask />
      // case 'Coinbase Wallet':
      case 'ethos':
        return <Ethos width={17} />
      case 'sui':
        return <Sui width={15} />
      default:
        return <WalletConnect />
    }
  }

  return (
    <div style={dialogStyle(isOpen)} role="dialog">
      <div style={backdropStyle()} onClick={() => console.log('clicked')} />

      <div style={modalOuterWrapperStyle()}>
        <div style={modalInnerWrapperStyle(width)}>
          <div style={dialogPanelStyle(width)}>
            <div>
              <div style={headerStyle()}>
                <h3 style={titleStyle()}>Sign In</h3>
                <div style={closeStyle()} onClick={onClose}>
                  &#x2715;
                </div>
              </div>
              <div style={mainContentStyle(width)}>
                <div style={walletOptionsStyle(width)}>
                  <div style={walletOptionStyle()} onClick={connectEthos}>
                    <button style={walletOptionButtonStyle()}>
                      {logo('ethos')}
                      Ethos
                    </button>
                  </div>
                  <div style={walletOptionStyle()} onClick={_connectSui}>
                    <button style={walletOptionButtonStyle()}>
                      {logo('sui')}
                      Sui Test Wallet
                    </button>
                  </div>
                  {/* {isOpen &&
                    connectors.map((connector: any) => (
                      <div
                        key={connector.id}
                        style={walletOptionStyle()}
                        onClick={() => connect!({ connector })}
                      >
                        <button disabled={!connector.ready} style={walletOptionButtonStyle()}>
                          {logo(connector.id)}
                          {connector.name}
                          {!connector.ready && (
                            <span style={connectorSubStyle()}>(unsupported)</span>
                          )}
                          {isLoading && pendingConnector?.id === connector.id && (
                            <span style={connectorSubStyle()}>(connecting)</span>
                          )}
                        </button>
                      </div>
                    ))}
                  {error && <div style={connectorWarning()}>{error.message}</div>} */}
                  {showMissingMessage && (
                    <div style={connectorWarning()}>
                      You do not have the necessary wallet extension installed.
                    </div>
                  )}
                </div>
                <div style={registrationStyle(width)}>
                  <div>
                    <h3 style={registrationHeaderStyle()}>
                      Sign up or log in with Google
                    </h3>
                    <div style={socialLoginButtonsStyle()} onClick={loginWithGoogle}>
                      <div style={socialLoginButtonStyle()}>
                        <Google width={36} />
                      </div>
                    </div>
                  </div>
                  <h3 style={registrationHeaderStyle()}>
                    Or sign up or log in with a link
                  </h3>
                  {signingIn ? (
                    <div style={loaderStyle()}>
                      <Loader width={50} />
                    </div>
                  ) : (
                    <>
                      <form onSubmit={sendEmail}>
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
                          href={`${walletAppUrl}/self-custodial`}
                          style={selfCustodialLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Create A Self-Custodial Wallet
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/*
How to convert tailwind to inline CSS:
Paste the tailwind styless into https://tailwind-to-css.vercel.app/
Set aside the media queries
Paste that output into https://staxmanade.com/CssToReact/
Add media queries using `modalInnerWrapperStyle` as an example
*/

const dialogStyle = (isOpen: boolean) =>
  ({
    display: isOpen ? 'block' : 'none',
    position: 'relative',
    zIndex: '10',
  } as React.CSSProperties)

// const mainWrapper = (isOpen: boolean) =>
//   // flex justify-center items-center
//   ({
//     display: isOpen ? 'block' : 'none',
//     justifyContent: 'center',
//     alignItems: 'center',
//   } as React.CSSProperties)

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

const dialogPanelStyle = (width: number) => {
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
    maxWidth: '40rem',
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

// const modalStyle = (isOpen: boolean) =>
//   ({
//     textAlign: 'left',
//     border: '1px solid rgb(203 213 225)',
//     borderRadius: '0.5rem',
//     transitionProperty: 'opacity',
//     transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
//     transitionDuration: '250ms',
//     opacity: isOpen ? 1 : 0,
//     position: 'absolute',
//     left: isOpen ? '50%' : '-9999px',
//     top: '40%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: 'white',
//     width: '660px',
//     fontWeight: '400',
//     zIndex: '99',
//   } as React.CSSProperties)

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

const walletOptionStyle = () =>
  ({
    padding: '12px',
    backgroundColor: '#F9FAFB',
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

// const connectorSubStyle = () => ({
//   fontWeight: '300',
//   color: 'gray',
//   fontSize: 'smaller',
// })

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
  }
  const sm = {
    padding: '24px',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

const registrationHeaderStyle = () =>
  ({
    fontWeight: '500',
    margin: '0',
  } as React.CSSProperties)

// const explainerStyle = () =>
//   ({
//     fontSize: 'smaller',
//   } as React.CSSProperties)

const inputStyle = () =>
  ({
    border: '1px solid rgb(203 213 225)',
    borderRadius: '0.5rem',
    padding: '6px',
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
