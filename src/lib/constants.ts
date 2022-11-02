export const appBaseUrl =
  typeof window !== 'undefined' && window.location.origin.indexOf('http://localhost') === 0
    ? 'http://localhost:3000'
    : 'https://ethoswallet.onrender.com'

export const captchaSiteKey = '6LcXUDshAAAAAPTZ3E7xi3-335IA9rncYVoey_ls';