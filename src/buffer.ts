export function ab2str(buf: ArrayBuffer): string {
  return new TextDecoder('utf-8').decode(new Uint8Array(buf))
}

export function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

export function hex2buf(hex: string): ArrayBuffer {
  const view = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return view.buffer
}

export function buf2hex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer)).map(x => ('00' + x.toString(16)).slice(-2)).join('')
}
