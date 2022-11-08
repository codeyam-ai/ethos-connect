import { Signer, SignerType } from '../types/Signer'
import getIframe from './getIframe'

const hideWallet = (signer: Signer) => {
    if (signer.type === SignerType.EXTENSION) return;
    getIframe(false)
}

export default hideWallet
