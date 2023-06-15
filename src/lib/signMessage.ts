type signProps = {
  signer?: any
  message: string | Uint8Array
}

const signMessage = async ({ signer, message }: signProps): Promise<any> => {
  return signer.signMessage({ message });
}

export default signMessage
