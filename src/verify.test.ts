import {equal} from 'node:assert'
import test from 'node:test'
import {getCryptoKey, verify} from './verify.js'

// Mock request
const signature = '99c4903df0b00ac32ba158db956ee39586adf05fea6be714055ac79a80bfd9dff59399b7da01ced95d0a252daee6bdb07e5f59cc546322bb779fd749b04f170c'
const timestamp = '202204091535'
const body = 'testmessage'
const request = new Request(new URL('https://localhost.com'), {
  method: 'POST',
  headers: {
    'X-Signature-Ed25519': signature,
    'X-Signature-Timestamp': timestamp,
  },
  body: new TextEncoder().encode(body),
})

// Ed25519 Public key (32 bit)
const verify_key = '9c7d775851a98ceb09a80928c1f8ff56706a0f5d91d841c72850fcd92e065b8f'
const verify_key_invalid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

test('Verify Request', async t => {
  await t.test('use valid key', async () => {
    equal(true, await verify(request, await getCryptoKey(verify_key)))
  })
  await t.test('use invalid key', async () => {
    equal(false, await verify(request, await getCryptoKey(verify_key_invalid)))
  })
})
