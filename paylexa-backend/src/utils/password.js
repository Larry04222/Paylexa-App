const { randomBytes, pbkdf2Sync, timingSafeEqual } = require('crypto');

const ITERATIONS = 120000;
const KEYLEN = 64;
const DIGEST = 'sha512';

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const derived = pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString('hex');
  return `${salt}:${derived}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const derived = pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString('hex');
  const storedBuffer = Buffer.from(hash, 'hex');
  const derivedBuffer = Buffer.from(derived, 'hex');
  if (storedBuffer.length !== derivedBuffer.length) {
    return false;
  }
  return timingSafeEqual(storedBuffer, derivedBuffer);
}

module.exports = {
  hashPassword,
  verifyPassword
};
