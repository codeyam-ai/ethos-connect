// UI should be running on 3001, Wallet should be running on 3000
export const appBaseUrl = (typeof window !== 'undefined' && window.location.origin === 'http://localhost:3001') ? 
  'http://localhost:3000' : 'https://ethoswalletexplorerdemo.onrender.com';
console.log('appBaseUrl :>> ', appBaseUrl);
