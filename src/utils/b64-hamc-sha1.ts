export async function b64_hmac_sha1(
  key: string,
  data: string,
): Promise<string> {
  // for the environment that supports crypto.subtle
  if (typeof crypto !== 'undefined') {
    const subtle = crypto.subtle;
    const encoder = new TextEncoder();
    const binKey = typeof key === 'string' ? encoder.encode(key) : key;
    const binData = typeof data === 'string' ? encoder.encode(data) : data;
    const args = { name: 'HMAC', hash: 'SHA-1' };
    const cryptoKey = await subtle.importKey('raw', binKey, args, true, ['sign']);
    return btoa(String.fromCharCode(...new Uint8Array(await subtle.sign(
      args,
      cryptoKey,
      binData,
    ))));
  }
  throw new Error('crypto.subtle is not supported');
  // https://pajhome.org.uk/crypt/md5/sha1.js
}

export default b64_hmac_sha1;