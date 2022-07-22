import store from 'store2'
import log from './log'

const connectSui = async () => {
  if (typeof window === 'undefined') return

  const suiWallet = (window as any).suiWallet

  if (!suiWallet) {
    return false
  }

  let confirmed = await suiWallet.hasPermissions()
  if (!confirmed) {
    confirmed = await suiWallet.requestPermissions()
  }

  if (confirmed) {
    const accounts = await suiWallet.getAccounts()

    if (!accounts || accounts.length === 0) return false

    const suiStore = store.namespace('sui')
    const storeResult = suiStore('account', accounts[0])
    const success = window.dispatchEvent(new Event('ethos-storage-changed'))
    log('connectSui', 'Dispatch event-storage-changed', storeResult, success)
  }

  return true
}

export default connectSui
