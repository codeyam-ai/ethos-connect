import { Signer, SignerType } from '../types/Signer'
import getIframe from './getIframe'

const showWallet = (signer: Signer) => {
    if (signer.type === SignerType.Extension) return;
    getIframe(true)
}

export default showWallet
