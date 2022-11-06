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

    const icon = (wallet: WalletAdapter) => {
        const src = wallet.name === 'Sui Wallet' ? 'https://sui.io/favicon.png' : wallet.icon

        return (
            <img src={src} height={32} width={32} />
        )
    }

    return (
        <div role="wallet-sign-in">
            <div style={styles.walletOptionContainer(width)}>
                {wallets?.map(
                    (wallet, index) => (
                        <IconButton
                            key={`wallet-${index}`}
                            icon={icon(wallet)}
                            data-name={wallet.name}
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