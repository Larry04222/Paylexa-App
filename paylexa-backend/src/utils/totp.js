const { randomBytes, createHmac } = require('crypto');

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function toBase32(buffer) {
  let bits = '';
  for (const byte of buffer) {
    bits += byte.toString(2).padStart(8, '0');
  }
  let base32 = '';
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.slice(i, i + 5).padEnd(5, '0');
    base32 += BASE32_ALPHABET[parseInt(chunk, 2)];
  }
  return base32;
}

function fromBase32(str) {
  let bits = '';
  const clean = str.replace(/=+$/, '').toUpperCase();
  for (const char of clean) {
    const idx = BASE32_ALPHABET.indexOf(char);
    if (idx === -1) {
      throw new Error('Invalid base32 character');
    }
    bits += idx.toString(2).padStart(5, '0');
  }
  const bytes = [];
  for (let i = 0; i < bits.length; i += 8) {
    const chunk = bits.slice(i, i + 8);
    if (chunk.length === 8) {
      bytes.push(parseInt(chunk, 2));
    }
  }
  return Buffer.from(bytes);
}

function generateSecret(length = 20) {
  return toBase32(randomBytes(length));
}

function generateTOTP(secret, window = 0, step = 30, digits = 6) {
  const key = fromBase32(secret);
  const counter = Math.floor(Date.now() / 1000 / step) + window;
  const buffer = Buffer.alloc(8);
  buffer.writeUInt32BE(Math.floor(counter / 0x100000000), 0);
  buffer.writeUInt32BE(counter & 0xffffffff, 4);
  const hmac = createHmac('sha1', key).update(buffer).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code = (hmac.readUInt32BE(offset) & 0x7fffffff) % (10 ** digits);
  return code.toString().padStart(digits, '0');
}

function verifyTOTP(secret, token, step = 30, digits = 6, window = 1) {
  for (let errorWindow = -window; errorWindow <= window; errorWindow++) {
    if (generateTOTP(secret, errorWindow, step, digits) === token) {
      return true;
    }
  }
  return false;
}

module.exports = {
  generateSecret,
  generateTOTP,
  verifyTOTP
};
