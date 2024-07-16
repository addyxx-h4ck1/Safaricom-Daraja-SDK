require('dotenv').config()
const { Transaction } = require('daraja-api-sdk')

// create a new instance with the transaction constructor

const transaction = new Transaction({
  customerKey: process.env.CUSTOMER_KEY,
  customerKeySecret: process.env.CUSTOMER_SECRET_KEY,
})

// function to request stk push

async function main() {
  try {
    let r = await transaction.sendTransaction({
      Amount: 1, // amount of money to be sent
      BusinessShortCode: process.env.BUSINESS_SHORTCODE, // your business shortcode
      CallBackURL: 'https://mydomain.com/callback', // It is the endpoint to which the results will be sent by M-Pesa API.
      PhoneNumber: process.env.MPESA_NUMBER, //phone number sending money
      PartyA: process.env.MPESA_NUMBER, // phone number to receive pin prompt
      Passkey: process.env.PASS_KEY,
    })
    console.log(r)
  } catch (err) {
    console.log(err)
  }
}

//call main function
main()

//=========ENVIRONMENT VARIABLES===========//

// CUSTOMER_KEY: get yours from safaricom developer dashboard
// CUSTOMER_SECRET_KEY: get yours from safaricom developer dashboard
// PASS_KEY: get yours from safaricom developer dashboard
// BUSINESS_SHORTCODE: get yours from safaricom developer dashboard
// MPESA_NUMBER: safaricom number sending money

//=========ENVIRONMENT VARIABLES===========//
