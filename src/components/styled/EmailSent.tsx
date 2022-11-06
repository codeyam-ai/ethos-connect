import React from 'react';
import EthosEnclosed from '../svg/EthosEnclosed';
import Header from './Header';
import * as styles from './signInModalStyles'

const EmailSent = () => {
    return (
        <Header
            title="Ethos sent you an email"
            dappIcon={<EthosEnclosed width={60} />}
        >
            <div style={styles.secondaryText()}>
                <p>
                    An email has been sent to you with a link to login.
                </p>
                <p>
                    If you don&#39;t receive it, please check your spam folder or contact us at:
                </p>
                <p>
                    support@ethoswallet.xyz
                </p>
            </div>
        </Header>
    )
}

export default EmailSent;