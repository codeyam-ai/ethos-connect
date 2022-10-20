import React, { MutableRefObject, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { captchaSiteKey } from '../../lib/constants'
import getConfiguration from '../../lib/getConfiguration'
import event from '../../lib/event'
import login from '../../lib/login'
import Ethos from '../svg/Ethos'
import * as styles from './signInModalStyles'

export type EmailProps = {
    setSigningIn: (signingIn: boolean) => void,
    setEmailSent: (emailSent: boolean) => void,
    captchaRef: MutableRefObject<any>,
    width: number
}

const Email = ({ setSigningIn, setEmailSent, captchaRef, width }: EmailProps) => {
    const { appId } = getConfiguration()
    const [email, setEmail] = useState('')
    
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

    return (
        <div>
            <span style={styles.secondaryHeaderText()}>Sign in with</span>
            <h2 style={{ margin: '0' }}>
                <span style={{ display: 'inline-flex' }}>
                    <Ethos width={20} />
                    <span style={styles.ethosWalletTitleText()}>Ethos Wallet</span>
                </span>
            </h2>
        
            <div role="email-sign-in"  style={{ padding: '16px 0' }}>
                <div>
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
            </div>
            <div style={{marginLeft: "-12px"}}>
                <ReCAPTCHA
                    sitekey={captchaSiteKey}
                    ref={captchaRef}
                    size="invisible"
                    onChange={sendEmail}
                />
            </div>
        </div>
    );
}

export default Email;