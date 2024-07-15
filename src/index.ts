import { getAccessToken } from './utils/get-access-token'
import { initiateStkPush } from './utils/initiate-stkpush'

getAccessToken({
  customerKey: 'zyzJn3R8VyYx3ggPjMRig2OGt1vGZjHDycV7Cw1sI5C7yqrB',
  customerSecret:
    'J5iOqwso1Gvh8s0TLyx0IhrAUCECqG0V5PRL6lx12hFbTgSoE6TuXMij69uHqZek',
})
  .then(async (res: any): Promise<void> => {
    try {
      let stkPush = await initiateStkPush(res.access_token, {
        Amount: 1,
        PhoneNumber: 254768299380,
        CallBackURL: 'https://mydomain.com/callback',
        Passkey:
          'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
        PartyA: 254768299380,
      })
      console.log(stkPush)
    } catch (error) {
      console.log(error)
    }
  })
  .catch((err) => {
    console.log(err)
  })
