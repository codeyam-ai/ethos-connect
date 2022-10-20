import React, { useCallback } from "react";
import type { WalletAdapter } from "@mysten/wallet-adapter-base";
import * as styles from './signInModalStyles'
import IconButton from "./IconButton";

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
                Select from your wallets:
            </span>
            <div style={styles.walletOptionContainer(width)}>
                {wallets?.map(
                    (wallet, index) => (
                        <IconButton
                            key={`wallet-${index}`}
                            icon={icon(wallet.icon)}
                            text={wallet.name}
                            onClick={_connectExtension}
                            width={width}
                        />
                    )
                )}
            </div>
        </div>
    )
}

export default Wallets;