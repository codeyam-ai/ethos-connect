export const appBaseUrl = (typeof window !== 'undefined' && window.location.origin === 'http://localhost:3000') ? 
  'http://localhost:3000' : 'https://ethoswalletexplorerdemo.onrender.com';
console.log('appBaseUrl :>> ', appBaseUrl);
