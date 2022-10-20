import React, { useCallback } from "react";
import type { WalletAdapter } from "@mysten/wallet-adapter-base";
import * as styles from './signInModalStyles'

export type WalletProps = {
    wallets: WalletAdapter[] | null,
    selectWallet: ((name: string) => void) | null,
    width: number
}

const Wallets = ({ wallets, selectWallet, width }: WalletProps) => {
    const _connectExtension = useCallback((e) => {
        if (!selectWallet) return;

        let element = e.target;
        let name;
        while (!name && element.parentNode) {
            name = element.dataset.name;
            element = element.parentNode;
        }
        selectWallet(name);
    }, []);

    const icon = (src?: string) => {
        if (!src || src.startsWith("chrome-extension")) return <></>;

        return (
            <img src={src} height={30} width={30} />
        )
    }

    return (
        <div role="wallet-sign-in">
            <span style={styles.signInOptionSubtitleText()}>
            Connect an existing wallet
            </span>
            <div style={styles.walletOptionContainer(width)}>
                {wallets?.map(
                    (wallet, index) => (
                        <button
                            key={`wallet-${index}`}
                            style={styles.walletOptionButton(width)}
                            data-name={wallet.name}
                            onClick={_connectExtension}
                        >
                            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                            {icon(wallet.icon)}
                            <span style={styles.walletOptionText()}>{wallet.name}</span>
                            </span>
                        </button>
                    )
                )}
            </div>
        </div>
    )
}

export default Wallets;