import { JsonRpcProvider } from "@mysten/sui.js"
import { HostedSigner, ExtensionSigner } from "./Signer"
import {SuiClient} from '@mysten/sui.js/client'

export type ProviderAndSigner = {
  provider: JsonRpcProvider | null
  signer: ExtensionSigner | HostedSigner | null
}

export type ClientAndSigner = {
  client:  SuiClient | null
  signer: ExtensionSigner | HostedSigner | null
}