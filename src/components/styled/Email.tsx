import React, { MutableRefObject, useCallback, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { captchaSiteKey } from '../../lib/constants'
import getConfiguration from '../../lib/getConfiguration'
import event from '../../lib/event'
import login from '../../lib/login'
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
    
    const onSubmit = useCallback(async () => {
        setSigningIn(true)
        sendEmail()
    //     if (captchaRef && captchaRef.current && process.env.NODE_ENV !== 'development') {
    //         try {
    //             await captchaRef.current.execute()
    //         } catch (e) {
    //             console.log('CAPTCHA ERROR', e)
    //             sendEmail()
    //         }
    //     } else {
    //         sendEmail()
    //     }
    }, []);

    const sendEmail = useCallback(async () => {
        await login({ email, appId })
        setEmail('')
        setSigningIn(false)
        setEmailSent(true)
        event({ action: 'send_email', category: 'sign_in', label: email, value: 1 })
    }, [login, email, appId]);

    return (
        <div role='email-sign-in'>
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