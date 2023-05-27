# Ed25519 Verify request

[Request](https://developer.mozilla.org/ru/docs/Web/API/Request) signature verification using the WebCrypto API.

## Usage
```ts
import {verify, getCryptoKey} from 'ed25519-verify-request'

const publicKey = '9c7d775851a98ceb09a80928c1f8ff56706a0f5d91d841c72850fcd92e065b8f'
const cryptoKey = await getCryptoKey(PublicKey) 

if (await verify(request, cryptoKey)) {
  return new Response('Verify')
}
```

## Api

* `getCryptoKey()` Convert public key to
[CryptoKey](https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey)


* `verify(request, key)` return **boolean** if request signature valid

