import { Chain } from '../enums/Chain'

export const primaryColor = "#6f53e4";
export const appBaseUrl =
  typeof window !== 'undefined' && window.location.origin.indexOf('http://localhost') === 0
    ? 'http://localhost:3000'
    : 'https://ethoswallet.onrender.com'

export const captchaSiteKey = '6LcXUDshAAAAAPTZ3E7xi3-335IA9rncYVoey_ls';
export const DEFAULT_NETWORK = "https://fullnode.testnet.sui.io/"
export const DEFAULT_FAUCET = "https://faucet.testnet.sui.io/"
export const DEFAULT_CHAIN = Chain.SUI_TESTNET