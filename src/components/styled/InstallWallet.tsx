import InstallWalletIcon from "../svg/InstallWalletIcon";
import React, { ReactNode } from "react";
import ethosDataIcon from "./ethosDataIcon";
import Header from "./Header";
import * as styles from './signInModalStyles'
import SuiEnclosed from "../svg/SuiEnclosed";

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
    const icon = (data?: string | ReactNode) => {
        if (!data) return <></>;

        if (typeof data === "string") {
            return (
                <img src={data} height={30} width={30} />
            )
        }

        return data;
    }

    const installWallets = [
        {
            name: "Ethos Wallet",
            icon: ethosDataIcon,
            link: "https://chrome.google.com/webstore/detail/ethos-wallet/mcbigmjiafegjnnogedioegffbooigli"
        },
        {
            name: "Sui Wallet",
            icon: <SuiEnclosed />,
            link: "https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
        },
        ...(walletInfos || [])
    ]

    return (
        <Header
            dappIcon={<InstallWalletIcon />}
            title="Install A Wallet"
            subTitle="Wallets allow you to interact with, store, send, and receive digital assets."
        >
            <div role="wallet-sign-in">
                <div style={styles.walletOptionContainer(width)}>
                    {installWallets?.map(
                        (installWallet, index) => (
                            <a
                                key={`wallet-${index}`}
                                style={styles.iconButton(width)}
                                href={installWallet.link}
                                target="_blank"
                            >   
                                {installWallet.name}
                                <div>
                                    {icon(installWallet.icon)}
                                </div>
                            </a>
                        )
                    )}
                </div>
            </div>
        </Header>
    )
}

export default InstallWallet;