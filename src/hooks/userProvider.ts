import { JsonRpcProvider } from "@mysten/sui.js";
import { suiFullNode } from "lib/constants";
import { useRef } from "react";

const useProvider = (): JsonRpcProvider => {
  const provider = useRef(new JsonRpcProvider(suiFullNode));
  return provider.current;
}

export default useProvider;