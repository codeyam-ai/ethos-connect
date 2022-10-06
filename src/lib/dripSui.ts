type DripSuiProps = {
  address: string
}

const dripSui = async ({ address }: DripSuiProps) => {
  const response = await fetch(
    'https://faucet.devnet.sui.io:443/gas',
    { 
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "FixedAmountRequest": {
          "recipient": address
        }
      })
    }
  );
  
  console.log("RESPONSE", response)
  return response.ok
}

export default dripSui
