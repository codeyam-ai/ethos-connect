// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    isWalletProvider,
    resolveAdapters,
    WalletAdapter
  } from "@mysten/wallet-adapter-base";
import { WalletStandardAdapterProvider } from "@mysten/wallet-adapter-all-wallets";
import { useEffect, useState } from "react";
  
const useWalletStandardAdapter = (): WalletAdapter[] => {
    const adapterAndProviders = [new WalletStandardAdapterProvider]
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
  
    console.log("WALLET", wallets, setWallets)
    return wallets;
}

export default useWalletStandardAdapter;