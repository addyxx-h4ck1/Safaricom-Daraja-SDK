import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios'
import { data } from '../types/types'

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
    let stkPush: any = await response
    return stkPush
  } catch (error: any) {
    return error
  }
}
