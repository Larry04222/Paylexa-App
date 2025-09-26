const { createHmac } = require('crypto');

function base64UrlEncode(obj) {
  const json = typeof obj === 'string' ? obj : JSON.stringify(obj);
  return Buffer.from(json).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = 4 - (str.length % 4 || 4);
  if (pad !== 4) {
    str += '='.repeat(pad);
  }
  return Buffer.from(str, 'base64').toString();
}

function sign(payload, secret, options = {}) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const exp = options.expiresIn ? now + options.expiresIn : undefined;
  const tokenPayload = exp ? { ...payload, exp } : { ...payload };
  const headerSegment = base64UrlEncode(header);
  const payloadSegment = base64UrlEncode(tokenPayload);
  const signature = createHmac('sha256', secret)
    .update(`${headerSegment}.${payloadSegment}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `${headerSegment}.${payloadSegment}.${signature}`;
}

function verify(token, secret) {
  const [headerSegment, payloadSegment, signature] = token.split('.');
  if (!headerSegment || !payloadSegment || !signature) {
    throw new Error('Invalid token');
  }
  const expectedSignature = createHmac('sha256', secret)
    .update(`${headerSegment}.${payloadSegment}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  if (expectedSignature !== signature) {
    throw new Error('Invalid signature');
  }
  const payload = JSON.parse(base64UrlDecode(payloadSegment));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }
  return payload;
}

module.exports = {
  sign,
  verify
};
