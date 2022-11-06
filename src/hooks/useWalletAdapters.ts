// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    WalletAdapterList,
    isWalletProvider,
    resolveAdapters,
} from "@mysten/wallet-adapter-base";
import { WalletStandardAdapterProvider } from "@mysten/wallet-adapter-all-wallets";
import { useEffect, useMemo, useState } from "react";

const useWalletAdapters = () => {
    const adapterAndProviders = useMemo<WalletAdapterList>(
        () => [new WalletStandardAdapterProvider()],
        []
    );

    const [wallets, setWallets] = useState(() =>
        resolveAdapters(adapterAndProviders)
    );

    useEffect(() => {
        const providers = adapterAndProviders.filter(isWalletProvider);
        if (!providers.length) return;

        // Re-resolve the adapters just in case a provider has injected
        // before we've been able to attach an event listener:
        const resolved = resolveAdapters(adapterAndProviders);
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

        const listeners = providers.map((provider) =>
            provider.on("changed", () => {
                setWallets(resolveAdapters(adapterAndProviders));
            })
        );

        return () => {
            listeners.forEach((unlisten) => unlisten());
        };
    }, [adapterAndProviders, wallets]);

    return wallets;
}
export default useWalletAdapters