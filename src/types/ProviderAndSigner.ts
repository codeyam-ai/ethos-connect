import { JsonRpcProvider } from "@mysten/sui.js"
import { Signer } from "./Signer"

export type ProviderAndSigner = {
  provider: JsonRpcProvider | any | null
  signer: Signer | null
}