import { JsonRpcProvider, Network } from "@mysten/sui.js";

type DripSuiProps = {
  address: string
}

const dripSui = async ({ address }: DripSuiProps) => {
  const provider = new JsonRpcProvider(Network.DEVNET);
  return provider.requestSuiFromFaucet(address)
}

export default dripSui
