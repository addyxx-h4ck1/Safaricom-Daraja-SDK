import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios'
import { accessTokenError, accessTokenTypes, TokenType } from '../types/types'

export const getAccessToken = async (credentials: accessTokenTypes) => {
  let urlEndpoint: string =
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

  let auth: string = Buffer.from(
    `${credentials.customerKey}:${credentials.customerSecret}`
  ).toString('base64')

  let config: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${auth}`,
    } as RawAxiosRequestHeaders,
  }
  try {
    let response: AxiosResponse = await axios.get(urlEndpoint, config)
    let token: TokenType = await { status: response.status, ...response.data }
    return token
  } catch (error: any) {
    if (!error.response)
      return {
        status: error.status,
        statusText: error.message,
        err: 'This probably occurs due to network problems',
      }
    let badRequest: accessTokenError = {
      status: 400,
      statusText: 'Bad Request',
      err: 'Please provide the correct customer key and customer secret key',
    }
    if (error.response.status === '400') return badRequest

    let otherError: accessTokenError = {
      status: error.response ? error.response.status : 500,
      statusText: error.response
        ? error.response.statusText
        : 'Internal server error, try again',
    }
    return otherError
  }
}
