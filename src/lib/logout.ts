import { ExtensionSigner, HostedSigner } from '../types/Signer'
import log from './log'

const logout = async (signer: ExtensionSigner | HostedSigner, fromWallet: boolean = false) => {
    log('logout', `-- Wallet ${fromWallet} --`, `-- Is Extension: ${signer?.type} --`, `-- Disconnect: ${!!signer?.disconnect} --`, "signer", signer)
        
    if (signer.type === "extension" || !fromWallet) {
        await signer.disconnect();
    } else {
        await signer.logout()
    }
}
    

export default logout
