import React, { useState } from 'react'
import login from '../../lib/login'
import WalletConnect from '../svg/WalletConnect'
import Ethos from '../svg/Ethos'
import Metamask from '../svg/Metamask'
import Loader from '../svg/Loader'
import getConfiguration from '../../lib/getConfiguration'
import { useConnect } from 'wagmi'
import { Chain } from '../../enums/Chain'

export type SignInModalProps = {
  isOpen: boolean
  onClose?: () => void
  onEmailSent?: () => void
}

const SignInModal = ({ isOpen, onClose, onEmailSent }: SignInModalProps) => {
  const { appId, chain } = getConfiguration()
  const eth = chain === Chain.Eth

  const [showEthosMessage, setShowEthosMessage] = useState<boolean>(false)
  const [signingIn, setSigningIn] = useState(false)
  const [email, setEmail] = useState('')

  const { connect, connectors, error, isLoading, pendingConnector } = eth
    ? useConnect()
    : {
        connect: null,
        connectors: [],
        error: null,
        isLoading: false,
        pendingConnector: null,
      }

  const sendEmail = async () => {
    setSigningIn(true)
    await login(email, appId)
    setEmail('')
    onEmailSent && onEmailSent()
    onClose && onClose()
    setSigningIn(false)
  }

  const connectEthos = () => {
    setShowEthosMessage(true)
  }

  const logo = (connectorId: string) => {
    switch (connectorId) {
      case 'metaMask':
        return <Metamask />
      // case 'Coinbase Wallet':
      case 'ethos':
        return <Ethos width={17} />
      default:
        return <WalletConnect />
    }
  }

  return (
    <div style={modalStyle(isOpen)}>
      <div style={headerStyle()}>
        <h3 style={titleStyle()}>Sign In</h3>
        <div style={closeStyle()} onClick={onClose}>
          &#x2715;
        </div>
      </div>
      <div style={mainContentStyle()}>
        <div style={walletOptionsStyle()}>
          <div style={walletOptionStyle()} onClick={() => connectEthos()}>
            <button style={walletOptionButtonStyle()}>
              {logo('ethos')}
              Ethos
            </button>
          </div>
          {isOpen &&
            connectors.map((connector: any) => (
              <div
                key={connector.id}
                style={walletOptionStyle()}
                onClick={() => connect!({ connector })}
              >
                <button disabled={!connector.ready} style={walletOptionButtonStyle()}>
                  {logo(connector.id)}
                  {connector.name}
                  {!connector.ready && <span style={connectorSubStyle()}>(unsupported)</span>}
                  {isLoading && pendingConnector?.id === connector.id && (
                    <span style={connectorSubStyle()}>(connecting)</span>
                  )}
                </button>
              </div>
            ))}

          {error && <div style={connectorWarning()}>{error.message}</div>}
          {showEthosMessage && (
            <div style={connectorWarning()}>
              You do not have the ethos wallet extension installed.
            </div>
          )}
        </div>
        <div style={registrationStyle()}>
          <h3 style={registrationHeaderStyle()}>One-Click Login Link</h3>
          <div style={explainerStyle()}>
            Enter your email and we&#39;ll send you a link that will sign you in.
          </div>
          {signingIn ? (
            <div style={loaderStyle()}>
              <Loader width={50} />
            </div>
          ) : (
            <>
              <input
                style={inputStyle()}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button style={buttonStyle()} onClick={sendEmail}>
                Send Login Link
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const modalStyle = (isOpen: boolean) =>
  ({
    textAlign: 'left',
    border: '1px solid rgb(203 213 225)',
    borderRadius: '0.5rem',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '250ms',
    opacity: isOpen ? 1 : 0,
    position: 'absolute',
    left: isOpen ? '50%' : '-9999px',
    top: '40%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    width: '660px',
    fontWeight: '400',
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

const mainContentStyle = () =>
  ({
    display: 'flex',
    justifyContent: 'space-between',
  } as React.CSSProperties)

const walletOptionsStyle = () =>
  ({
    width: '300px',
    padding: '24px 12px',
    borderRight: '1px solid rgb(241 245 249)',
    gap: '6px',
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties)

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

const connectorSubStyle = () => ({
  fontWeight: '300',
  color: 'gray',
  fontSize: 'smaller',
})

const registrationStyle = () =>
  ({
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } as React.CSSProperties)

const registrationHeaderStyle = () =>
  ({
    fontWeight: '500',
    margin: '0',
  } as React.CSSProperties)

const explainerStyle = () =>
  ({
    fontSize: 'smaller',
  } as React.CSSProperties)

const inputStyle = () =>
  ({
    border: '1px solid rgb(203 213 225)',
    borderRadius: '0.5rem',
    padding: '12px',
    width: '90%',
  } as React.CSSProperties)

const buttonStyle = () =>
  ({
    border: '1px solid rgb(203 213 225)',
    borderRadius: '0.5rem',
    padding: '12px',
    backgroundColor: '#761AC7',
    color: '#FFFFFF',
    width: '50%',
    textDecoration: 'none',
  } as React.CSSProperties)

const loaderStyle = () =>
  ({
    display: 'flex',
    justifyContent: 'center',
    padding: '45px 0',
  } as React.CSSProperties)

const connectorWarning = () => ({
  fontSize: 'small',
  textAlign: 'center',
  paddingTop: '6px',
} as React.CSSProperties)

export default SignInModal
