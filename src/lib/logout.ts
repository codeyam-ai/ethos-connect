import { Signer } from '../types/Signer'
import log from './log'

const logout = async (signer: Signer, wallet: boolean = false) => {
  log('logout', `-- Is Extension: ${signer?.type} --`, `-- Disconnect: ${!!signer?.disconnect} --`, "signer", signer)
    
  signer.disconnect(wallet)
}

export default logout
