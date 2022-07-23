import getConfiguration from './getConfiguration'

type ApiCallProps = {
  relativePath: string
  method?: string
  body?: any
}

const apiCall = async ({ relativePath, method = 'GET', body }: ApiCallProps) => {
  const { walletAppUrl } = getConfiguration()
  const data = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  } as any

  if (body) {
    data.body = JSON.stringify(body)
  }

  const response = await fetch(`${walletAppUrl}/api/${relativePath}`, data)
  const json = await response.json()
  const { status } = response
  return { json, status }
}

export default apiCall
