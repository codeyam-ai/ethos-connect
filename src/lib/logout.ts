import { ExtensionSigner, HostedSigner } from '../types/Signer'
import log from './log'

const logout = async (signer: ExtensionSigner | HostedSigner, fromWallet: boolean = false) => {
    log('logout', `-- Wallet ${fromWallet} --`, `-- Is Extension: ${signer?.type} --`, `-- Disconnect: ${!!signer?.disconnect} --`, "signer", signer)
        
    if (signer.type === "extension" || !fromWallet) {
        signer.disconnect();
    } else {
        signer.logout()
    }
}
    

export default logout
