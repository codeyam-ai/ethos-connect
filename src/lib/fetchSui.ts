const fetchSui = async (network: string, method: string, params: string[]) => {
  const data = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      "jsonrpc": "2.0", 
      "method": method, 
      "params": params, 
      "id": 1
    })
  }

  const response = await fetch(network, data);
  const json = await response.json();
  // console.log("SUI JSON", json, response, json.result?.EffectResponse?.effects, method, params)
  
  if (json.error?.message) {
    return { error: json.error?.message }
  }

  return json.result;
}

export default fetchSui;