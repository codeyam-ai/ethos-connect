import React from 'react';
import Header from './Header';
import * as styles from './signInModalStyles'
import EthosWalletIcon from '../svg/EthosWalletIcon';

const EmailSent = () => {
    return (
        <Header
            title="Ethos sent you an email"
            dappIcon={<EthosWalletIcon />}
        >
            <div style={styles.secondaryText()}>
                <p style={{ whiteSpace: 'nowrap' }}>
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