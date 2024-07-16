import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios'
import { data } from '../types/types'

/**
 * Initiates an STK push using the access token and options.
 * @param accessToken - The access token.
 * @param options - The options for the STK push.
 * @returns A promise that resolves to the result of the STK push.
 */

export const initiateStkPush = async (
  accessToken: string,
  transactionDetails: data
): Promise<void> => {
  //safaricom sandbox endpoint
  let urlEndpoint =
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
  //create the timeStamp
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14)
  //create the password
  const password = Buffer.from(
    `${transactionDetails.BusinessShortCode || 174379}${
      transactionDetails.Passkey
    }${timestamp}`
  ).toString('base64')
  //set axios headers
  let config: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    } as RawAxiosRequestHeaders,
  }
  //create transaction details
  const transactionData = {
    BusinessShortCode: transactionDetails.BusinessShortCode || 174379,
    Password: password,
    Timestamp: timestamp,
    TransactionType:
      transactionDetails.TransactionType || 'CustomerPayBillOnline',
    Amount: transactionDetails.Amount,
    PartyA: transactionDetails.PartyA,
    PartyB: transactionDetails.PartyB || 174379,
    PhoneNumber: transactionDetails.PhoneNumber,
    CallBackURL: transactionDetails.CallBackURL,
    AccountReference: transactionDetails.AccountReference || 'CompanyXLTD',
    TransactionDesc:
      transactionDetails.TransactionDesc || 'Payment for services',
  }

  try {
    let response: AxiosResponse = await axios.post(
      urlEndpoint,
      transactionData,
      config
    )
    let stkPush: any = await { status: response.status, ...response.data }
    return stkPush
  } catch (error: any) {
    let otherError: any = {
      status: error.status,
      statusText: error.message || 'Internal server error',
      err: 'This probably occurs due to network problems',
    }
    if (!error.response) return otherError
    let badRequest: any = {
      status: error.response.status,
      statusText: error.response.statusText,
      err:
        error.response.data.errorMessage +
        ' provide the correct customer key and customer secret key',
    }
    if (error.response.status === 404) return badRequest
    let unknowErrors: any = {
      status: error.response.status,
      errorMessage: error.response.data.errorMessage,
    }
    return unknowErrors
  }
}
