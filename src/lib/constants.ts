import { Network } from "@mysten/sui.js";

export const primaryColor = "#6f53e4";
export const appBaseUrl =
  typeof window !== 'undefined' && window.location.origin.indexOf('http://localhost') === 0
    ? 'http://localhost:3000'
    : 'https://ethoswallet.onrender.com'

export const captchaSiteKey = '6LcXUDshAAAAAPTZ3E7xi3-335IA9rncYVoey_ls';
export const DEFAULT_NETWORK = Network.DEVNET