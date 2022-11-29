import { JsonRpcProvider } from "@mysten/sui.js"
import { HostedSigner, ExtensionSigner } from "./Signer"

export type ProviderAndSigner = {
  provider: JsonRpcProvider | any | null
  signer: ExtensionSigner | HostedSigner | null
}