# Ed25519 Verify request

[Request] validation using the Ed25519 algorithm.

## Install

```shell
npm install @maks11060/ed25519-verify-request
```

```shell
pnpm add @maks11060/ed25519-verify-request
```

## Usage

```ts
import {verify, getCryptoKey} from '@maks11060/ed25519-verify-request'

const publicKey = env['PUBLIC_KEY']
const cryptoKey = await getCryptoKey(publicKey)

if (await verify(request, cryptoKey)) {
  return new Response('Verify')
}
```

## Example

```ts
import {verify, getCryptoKey} from '@maks11060/ed25519-verify-request'

const request = new Request(new URL('https://localhost.com'), {
  method: 'POST',
  headers: {
    'X-Signature-Ed25519': '99c4903df0b00ac32ba158db956ee39586adf05fea6be714055ac79a80bfd9dff59399b7da01ced95d0a252daee6bdb07e5f59cc546322bb779fd749b04f170c',
    'X-Signature-Timestamp': '202204091535',
  },
  body: new TextEncoder().encode('testmessage'),
})

const publicKey = '9c7d775851a98ceb09a80928c1f8ff56706a0f5d91d841c72850fcd92e065b8f'
const cryptoKey = await getCryptoKey(publicKey)

await verify(request, cryptoKey) // true
```

## Api

* `getCryptoKey()` Import **Ed25519** Public key to [CryptoKey]

* `verify(request, key)` return **Boolean**

[Request]: https://developer.mozilla.org/ru/docs/Web/API/Request

[CryptoKey]: https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey
