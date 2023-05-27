import {hex2buf} from './buffer.js'

const Platform = {
  web: 'Ed25519',
  // https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#supported-algorithms
  cloudflare: {name: 'NODE-ED25519', namedCurve: 'NODE-ED25519'},
} as const

// Default using web standard alg Ed25519.
let alg: string | EcKeyAlgorithm = Platform.web
try {
  // For CloudFlare https://developers.cloudflare.com/workers/runtime-apis/web-standards/#navigatoruseragent
  if (navigator?.userAgent?.includes('Cloudflare-Workers')) alg = Platform.cloudflare
} catch {
}

export function getCryptoKey(verify_key: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    hex2buf(verify_key),
    alg,
    true,
    ['verify'],
  )
}

export async function verify(request: Request, key: CryptoKey) {
  const signature = request.headers.get('X-Signature-Ed25519')
  const timestamp = request.headers.get('X-Signature-Timestamp')
  const body = await request.clone().text()

  if (signature == null || timestamp == null || !Boolean(body)) {
    return false
  }

  return crypto.subtle.verify(
    key.algorithm,
    key,
    hex2buf(signature),
    new TextEncoder().encode(timestamp + body),
  )
}
