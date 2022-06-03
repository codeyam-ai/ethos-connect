import apiCall from "./apiCall";

const query = async ({ network, address, abi, functionName, inputValues, host }) => {
  const { json: { response } } = await apiCall({
    relativePath: "contracts/query",
    method: "POST",
    body: { network, address, abi, functionName, inputValues },
    host
  })

  return response;
}

export default query;