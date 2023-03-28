import { JsonRpcProvider } from "@mysten/sui.js"
import { HostedSigner, ExtensionSigner } from "./Signer"

export type ProviderAndSigner = {
  provider: JsonRpcProvider | null
  signer: ExtensionSigner | HostedSigner | null
}