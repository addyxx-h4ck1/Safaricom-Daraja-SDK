export type str = string

export interface accessTokenTypes {
  customerKey: string
  customerSecret: string
}

export interface TokenType {
  status: string | number
  access_token?: string
  expires_in: string | number
}

export interface accessTokenError {
  status?: string | number
  statusText?: string
  err?: string
}

export type data = {
  BusinessShortCode?: string | number
  Password?: string
  Passkey?: string
  Timestamp?: string | number
  TransactionType?: string
  Amount?: string | number
  PartyA?: string | number
  PartyB?: string | number
  PhoneNumber?: string | number
  CallBackURL?: string
  AccountReference?: string
  TransactionDesc?: string
}

//   const data = {
//     BusinessShortCode: process.env.MPESA_SHORTCODE,
//     Password: password,
//     Timestamp: timestamp,
//     TransactionType: 'CustomerPayBillOnline',
//     Amount: amount,
//     PartyA: phone,
//     PartyB: process.env.MPESA_SHORTCODE,
//     PhoneNumber: phone,
//     CallBackURL: process.env.MPESA_CALLBACK_URL,
//     AccountReference: 'CompanyXLTD',
//     TransactionDesc: 'Payment for services',
//   }
