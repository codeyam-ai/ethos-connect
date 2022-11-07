import React, { FormEvent, useCallback, useMemo, useState } from 'react'
// import ReCAPTCHA from 'react-google-recaptcha'
// import { captchaSiteKey } from '../../lib/constants'
import getConfiguration from '../../lib/getConfiguration'
import event from '../../lib/event'
import login from '../../lib/login'
import * as styles from './signInModalStyles'
import IconButton from './IconButton'

export type EmailProps = {
    setSigningIn: (signingIn: boolean) => void,
    setEmailSent: (emailSent: boolean) => void,
    // captchaRef: MutableRefObject<any>,
    width: number
}

const Email = ({ setSigningIn, setEmailSent, width }: EmailProps) => {
    const { apiKey } = getConfiguration()
    const [email, setEmail] = useState('')

    const validEmail = useMemo(() => {
        if (!email) return false;
        if (email.length === 0) return false;
        return !!email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
    }, [email])

    const sendEmail = useCallback(async () => {
        if (!validEmail) return
        await login({ email, apiKey })
        setEmail('')
        setSigningIn(false)
        setEmailSent(true)
        event({ action: 'send_email', category: 'sign_in', label: email, value: 1 })
    }, [validEmail, login, email, apiKey]);

    const _handleChange = useCallback((e) => {
        setEmail(e.target.value)
    }, [])

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        if (!validEmail) {
            e.preventDefault()
            return
        }
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
    }, [sendEmail]);

    return (
        <div role='email-sign-in'>
            <form onSubmit={onSubmit} style={styles.walletOptionContainer(width)}>
                <input
                    style={styles.emailInput()}
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={_handleChange}
                />
                <IconButton
                    text="Sign In With Email"
                    type='submit'
                    width={width}
                    disabled={!validEmail}
                    primary={true}
                />
            </form>
            {/* <div style={{ display: 'none', marginLeft: "-12px" }}>
                <ReCAPTCHA
                    sitekey={captchaSiteKey}
                    ref={captchaRef}
                    size="invisible"
                    onChange={sendEmail}
                />
            </div> */}
        </div>
    );
}

export default Email;