export const appBaseUrl =
  typeof window !== 'undefined' && window.location.origin.indexOf('http://localhost') === 0
    ? 'http://localhost:3000'
    : 'https://ethoswallet.onrender.com'


const siteKey = '42d9558d-5d0c-4ffa-9d1b-ac6fe68ca565';
// testing site keys - do NOT use in prod. For some reason bot_detected didn't show the captcha... looking into this.
// const publisherSiteKey = '10000000-ffff-ffff-ffff-000000000001';
// const safeEndUserSiteKey = '20000000-ffff-ffff-ffff-000000000002';
// const botDetectedSiteKey = '30000000-ffff-ffff-ffff-000000000003';

export const hCaptchaSiteKey = siteKey;