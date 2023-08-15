import { HostedSigner, ExtensionSigner } from "./Signer"
import {SuiClient} from '@mysten/sui.js/client'

export type ClientAndSigner = {
  client:  SuiClient | null
  signer: ExtensionSigner | HostedSigner | null
}