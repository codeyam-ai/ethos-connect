import React from "react";
import * as styles from './signInModalStyles'

export type MobileWalletInfo = {
    name: string,
    icon: string,
    link: string
}

export type MobileWalletProps = {
    walletInfos?: MobileWalletInfo[]
    width: number
}

const MobileWallet = () => {
    return (
        <div role="wallet-sign-in">
            <span style={styles.ethosWalletTitleText()}>
                Connect A Mobile Wallet
            </span>
            <div style={styles.walletExplanation()}>
                <p>
                    There are no mobile wallets yet on Sui.
                </p>
            </div>
        </div>
    )
}

export default MobileWallet;