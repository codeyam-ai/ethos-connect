type signProps = {
  signer?: any
  message: string | Uint8Array
}

const sign = async ({ signer, message }: signProps): Promise<any> => {
  return signer.sign({ message });
}

export default sign
