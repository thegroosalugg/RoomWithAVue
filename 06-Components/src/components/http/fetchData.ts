export type ApiError = {
  [key: string]: string
} & {
  status: number
}

export interface Fetch {
      url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: FormData | Record<string, unknown>
   token?: string
}

export const API_URL = import.meta.env.VITE_SERVER_URL

const fetchData = async ({ url, method = 'GET', data, token }: Fetch) => {
  const isFile = data instanceof FormData // multipart/form-data
  const   body = data ? (isFile ? data : JSON.stringify(data)) : null
  const headers: HeadersInit = {}
  if (!isFile) headers['Content-Type'] = 'application/json'

  // refresh token not used in demo: logic retained as pattern reusable for any token based auth
  const makeRequest = async (token?: string) => {
    if (token) headers['Authorization'] = `Bearer ${token}`
    return fetch(API_URL + url, { method, headers, body })
  }

  let response = await makeRequest(token)
  let  resData = await response.json()

  if (response.status === 401) {
    const newToken = 'token' // demo only: replace with token refresh function
    if (newToken) {
      response = await makeRequest(newToken)
       resData = await response.json()
    }
  }

  if (!response.ok) {
    throw { ...resData, status: response.status } as ApiError
  }

  return resData
}

export default fetchData
