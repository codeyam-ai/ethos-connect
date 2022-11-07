// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    WalletAdapterList,
    isWalletProvider,
    resolveAdapters,
    WalletAdapter
} from "@mysten/wallet-adapter-base";
import { WalletStandardAdapterProvider } from "@mysten/wallet-adapter-all-wallets";
import { useEffect, useMemo, useState } from "react";

const useWalletAdapters = () => {
    const adapterAndProviders = useMemo<WalletAdapterList>(
        () => [new WalletStandardAdapterProvider()],
        []
    );

    const [wallets, setWallets] = useState<WalletAdapter[]>(() => []);

    useEffect(() => {
        const providers = adapterAndProviders.filter(isWalletProvider);
        if (!providers.length) return;

        const setIfDifferent = (newAdaptersAndProviders: WalletAdapterList) => {
            const resolved = resolveAdapters(newAdaptersAndProviders);
            if (resolved.length !== wallets.length) {
                setWallets(resolved);
            } else {
                for (let i=0; i<wallets.length; ++i) {
                    if (wallets[i] !== resolved[i]) {
                        setWallets(resolved);
                        break;
                    }
                }
            }
        }

        setIfDifferent(adapterAndProviders)

        const listeners = providers.map((provider) =>
            provider.on("changed", () => {
                setIfDifferent(adapterAndProviders);
            })
        );

        return () => {
            listeners.forEach((unlisten) => unlisten());
        };
    }, [adapterAndProviders, wallets]);

    return wallets;
}
export default useWalletAdapters