import apiCall from './apiCall'

type QueryProps = {
  network: string
  contractAddress: string
  contractABI: any
  functionName: string
  inputValues: any
}

const query = async ({
  network,
  contractAddress,
  contractABI,
  functionName,
  inputValues,
}: QueryProps) => {
  const {
    json: { response },
  } = await apiCall({
    relativePath: 'contracts/query',
    method: 'POST',
    body: {
      network,
      address: contractAddress,
      abi: contractABI,
      functionName,
      inputValues,
    },
  })

  return response
}

export default query
