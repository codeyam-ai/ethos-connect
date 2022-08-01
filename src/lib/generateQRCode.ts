import QRCode from 'qrcode'

const generateQRCode = async (url: string): Promise<string> => {
  return new Promise((resolve) => {
    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000',
        light: '#FFF'
      }
    }, (err: any, qrCodeUrl: any) => {
      if (err) return console.error(err)
      resolve(qrCodeUrl)
    })
  });
}

export default generateQRCode