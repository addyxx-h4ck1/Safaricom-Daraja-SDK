import { data } from './types/types'
import { getAccessToken } from './utils/get-access-token'
import { initiateStkPush } from './utils/initiate-stkpush'

export class Transaction {
  private customerKey: string
  private customerKeySecret: string

  /**
   * Creates an instance of the SDK.
   * @param config - The configuration object containing the customer key and secret key.
   */
  constructor(credentials: { customerKey: string; customerKeySecret: string }) {
    this.customerKey = credentials.customerKey
    this.customerKeySecret = credentials.customerKeySecret
  }

  /**
   * Gets the customer key.
   * @returns The customer key.
   */
  getCustomerKey(): string {
    return this.customerKey
  }

  /**
   * Gets the customer secret key.
   * @returns The customer secret key.
   */
  getCustomerKeySecret(): string {
    return this.customerKeySecret
  }

  /**
   * The sendTransaction function to execute the STK push.
   * @param options - The options for the STK push.
   * @returns A promise that resolves when the function is complete.
   */
  async sendTransaction(options: data): Promise<void> {
    if (this.getCustomerKey() === '')
      throw new Error('Please provide your customer key')
    if (this.getCustomerKeySecret() === '')
      throw new Error('Please provide your customer secret key')
    try {
      let authToken: any = await getAccessToken({
        customerKey: this.getCustomerKey(),
        customerSecret: this.getCustomerKeySecret(),
      })
      let stkResponse = await initiateStkPush(authToken.access_token, options)
      return stkResponse
    } catch (error: any) {
      return error
    }
  }
}
