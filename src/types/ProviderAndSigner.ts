import { Signer } from "./Signer"

export type ProviderAndSigner = {
  provider: any | null
  signer?: Signer
}