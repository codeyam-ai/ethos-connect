import React from "react";
import ethosDataIcon from "./ethosDataIcon";
import * as styles from './signInModalStyles'

export type WalletInstallInfo = {
    name: string,
    icon: string,
    link: string
}

export type InstallWalletProps = {
    walletInfos?: WalletInstallInfo[]
    width: number
}

const InstallWallet = ({ walletInfos, width }: InstallWalletProps) => {
    const icon = (src?: string) => {
        if (!src) return <></>;

        return (
            <img src={src} height={30} width={30} />
        )
    }

    const installWallets = [
        {
            name: "Ethos Wallet",
            icon: ethosDataIcon,
            link: "https://chrome.google.com/webstore/detail/ethos-wallet/mcbigmjiafegjnnogedioegffbooigli"
        },
        ...(walletInfos || [])
    ]

    return (
        <div role="wallet-sign-in">
            <span style={styles.ethosWalletTitleText()}>
                Install A Wallet
            </span>
            <div style={styles.walletExplanation()}>
                <p>
                    Wallets allow you to interact with, store, send, and receive digital assets.
                </p>
                <br/>
                <p>
                    The following wallets are available as chrome extensions and mobile wallets
                    on the Sui blockchain.
                </p>
            </div>
            <div style={styles.signInOptionSubtitleText()}>
                Sui Browser Extension Wallets
            </div>
            <div style={styles.walletOptionContainer(width)}>
                {installWallets?.map(
                    (installWallet, index) => (
                        <a
                            key={`wallet-${index}`}
                            style={styles.iconButton(width)}
                            target="_blank"
                            href={installWallet.link}
                        >
                            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                {icon(installWallet.icon)}
                                <span style={styles.iconButtonText()}>{installWallet.name}</span>
                            </span>
                        </a>
                    )
                )}
            </div>
        </div>
    )
}

export default InstallWallet;