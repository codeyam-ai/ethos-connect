import React, { useState } from 'react'
// import connectWallet from '../../lib/connectWallet'
import login from '../../lib/login'
import WalletConnect from '../svg/WalletConnect'
import Ethos from '../svg/Ethos'
import Metamask from '../svg/Metamask'
import Loader from '..//svg/Loader'
import connectMetaMask from '../../utils/metamask'
import { ethers } from 'ethers'
// import { Signer } from '../../lib/ethersWrapper/Signer';
// import { getAppBaseUrl } from 'lib'

type SignInModalProps = {
  appId: string
  isOpen: boolean
  onClose: () => void
  setProvider: React.Dispatch<React.SetStateAction<ethers.providers.Web3Provider | undefined>>,
  setSigner: React.Dispatch<React.SetStateAction<ethers.providers.JsonRpcSigner | undefined>>
}

const SignInModal = ({ appId, isOpen, onClose, setProvider, setSigner }: SignInModalProps) => {
  const [signingIn, setSigningIn] = useState(false)
  const [email, setEmail] = useState('')

  const _login = async () => {
    // const appBaseUrl = getAppBaseUrl();
    setSigningIn(true)
    const user = await login(email, appId)
    setEmail('')
    console.log('user :>> ', user);
    if (!user) {
      setSigner(user)
    }
    // const provider = new ethers.providers.JsonRpcProvider(appBaseUrl + '/api/rpc');
    // const signer = provider.getSigner() as Signer;
    // Provider has a different type here...
    // setProvider(provider);
    // setSigner(signer);
    onClose()
  }

  const _connectWallet = async () => {
    onClose()
  }

  const _connectMetaMask = async () => {
    const { provider, signer } = await connectMetaMask();
    setProvider(provider);
    setSigner(signer);
    onClose();
  }

  const walletOptions = [
    { name: 'Ethos', logo: <Ethos />, onClick: _connectWallet },
    { name: 'Metamask', logo: <Metamask />, onClick: _connectMetaMask },
    { name: 'WalletConnect', logo: <WalletConnect />, onClick: _connectWallet },
  ]

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
          {walletOptions.map((option, index) => (
            <div key={index} style={walletOptionStyle()} onClick={option.onClick}>
              {option.logo}
              {option.name}
            </div>
          ))}
        </div>
        <div style={registrationStyle()}>
          <h3 style={registrationHeaderStyle()}>Magic Link</h3>
          <div style={explainerStyle()}>
            Enter your email and we&#39;ll send you a magic link that will sign you in.
          </div>
          {signingIn ? (
            <div className="flex justify-center">
              <Loader width={100} />
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
              <button style={buttonStyle()} onClick={_login}>
                Send Magic Link
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
  gap: '12px',
  display: 'flex',
  flexDirection: 'column',
} as React.CSSProperties)

const walletOptionStyle = () =>
({
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  gap: '0.75rem',
  backgroundColor: '#F9FAFB',
  borderRadius: '0.5rem',
  fontWeight: '500',
  cursor: 'pointer',
} as React.CSSProperties)

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
  width: '100%',
} as React.CSSProperties)

const buttonStyle = () =>
({
  border: '1px solid rgb(203 213 225)',
  borderRadius: '0.5rem',
  padding: '12px',
  backgroundColor: '#761AC7',
  color: '#FFFFFF',
  width: '50%',
} as React.CSSProperties)

export default SignInModal
