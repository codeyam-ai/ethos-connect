import CheckMark from '../svg/CheckMark'
import * as styles from './signInModalStyles'

const EmailSent = () => {
    return (
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
    )
}

export default EmailSent;