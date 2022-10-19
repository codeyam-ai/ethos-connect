// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    isWalletProvider,
    resolveAdapters,
    WalletAdapter,
    WalletAdapterProvider
  } from "@mysten/wallet-adapter-base";
import { WalletStandardAdapterProvider } from "@mysten/wallet-adapter-all-wallets";
import { useEffect, useMemo, useState } from "react";
  
const useWalletStandardAdapter = (): WalletAdapter[] => {
    const adapterAndProviders = useMemo<WalletAdapterProvider[]>(
        () => [new WalletStandardAdapterProvider()],
        []
    );

    const [wallets, setWallets] = useState(() =>
      resolveAdapters(adapterAndProviders)
    );

    useEffect(() => {
      const providers = adapterAndProviders.filter(isWalletProvider);
      if (!providers.length) return;
  
      const listeners = providers.map((provider) =>
        provider.on("changed", () => {
          setWallets(resolveAdapters(adapterAndProviders));
        })
      );
  
      return () => {
        listeners.forEach((unlisten) => unlisten());
      };
    }, [adapterAndProviders]);
  
    return wallets;
}

export default useWalletStandardAdapter;