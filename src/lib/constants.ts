export const appBaseUrl =
  typeof window !== 'undefined' && window.location.origin.indexOf('http://localhost') === 0
    ? 'http://localhost:3000'
    : 'https://ethoswallet.onrender.com'
