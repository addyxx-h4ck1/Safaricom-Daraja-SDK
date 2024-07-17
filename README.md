# Daraja SDK

[![npm version](https://img.shields.io/npm/v/daraja-api-sdk.svg?style=flat)](https://www.npmjs.com/package/daraja-api-sdk)

A JavaScript SDK for easy integration with the Safaricom Daraja API, facilitating seamless mobile payment and USSD services integration.

## Installation

You can install the daraja-api-sdk via npm:

```bash
npm install daraja-api-sdk
```

## Usage

```javascript
const { Transaction } = require('daraja-api-sdk')

// Initialize SDK with your credentials
const transaction = new Transaction({
  customerKey: 'yourCustomerKey',
  customerKeySecret: 'yourCustomerKeySecret',
})

// Example usage: Initiating STK push
// Change these values with your actual details...This is just for demo
const options = {
  BusinessShortCode: '174379',
passKey: 'Pass key can be found in the your safaricom developer dashboard'
  TransactionType: 'CustomerPayBillOnline',
  Amount: '1',
  PartyA: 'number sending money',
  PartyB: '174379',
  PhoneNumber: 'The Mobile Number to receive the STK Pin Prompt',
  CallBackURL:
    'It is the endpoint to which the results will be sent by M-Pesa API Party A completes or cancel the transaction',
  AccountReference: 'Test',
  TransactionDesc: 'Test',
}

// Using async to optimize the code to Send the transaction request
const sendTransaction = async () => {
  try {
    const result = await transaction.sendTransaction(options); 
    console.log('STK push initiated:', result);
  } catch (error) {
    console.error('Error initiating STK push:', error.message);
  }
};

// Call the function to initiate the transaction
sendTransaction();
```

#### If everything is correct you should get back an object:

```json
{
  "status": 200,
  "MerchantRequestID": "29115-34620561-1",
  "CheckoutRequestID": "ws_CO_191220191020363925",
  "ResponseCode": "0",
  "ResponseDescription": "Success. Request accepted for processing",
  "CustomerMessage": "Success. Request accepted for processing"
}
```

#### If you get an error you should get back an object with status code , error message and a possible explanation of the error.

## Documentation

For detailed documentation, API reference, and examples, visit the [Github respository](https://github.com/addyxx-h4ck1/Safaricom-Daraja-SDK).
