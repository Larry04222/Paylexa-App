const { randomUUID, createHash } = require('crypto');
const config = require('../config/env');
const { sign, verify } = require('../utils/jwt');

function createAccessToken(user) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = { sub: user.id, email: user.email, jti: randomUUID(), iat: issuedAt };
  const token = sign(payload, config.auth.jwtSecret, { expiresIn: config.auth.accessTokenTtl });
  const expiresAt = issuedAt + config.auth.accessTokenTtl;
  return { token, expiresAt };
}

function createRefreshToken() {
  const token = randomUUID().replace(/-/g, '');
  const expiresAt = Math.floor(Date.now() / 1000) + config.auth.refreshTokenTtl;
  return { token, expiresAt };
}

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

function verifyAccessToken(token) {
  return verify(token, config.auth.jwtSecret);
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  hashToken,
  verifyAccessToken
};
