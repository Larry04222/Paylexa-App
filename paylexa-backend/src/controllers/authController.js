const prisma = require('../config/prisma');
const redis = require('../config/redis');
const config = require('../config/env');
const { hashPassword, verifyPassword } = require('../utils/password');
const { generateSecret, verifyTOTP } = require('../utils/totp');
const { createAccessToken, createRefreshToken, hashToken } = require('../services/tokenService');

async function register(req, res) {
  const { email, password, fullName, enableTwoFactor } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ message: 'Email already registered' });
    return;
  }
  const passwordHash = hashPassword(password);
  const twoFactorSecret = enableTwoFactor ? generateSecret() : null;
  const now = new Date().toISOString();
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      fullName: fullName || '',
      twoFactorEnabled: Boolean(enableTwoFactor),
      twoFactorSecret,
      createdAt: now,
      updatedAt: now
    }
  });
  const currencies = await prisma.currency.findMany();
  for (const currency of currencies) {
    await prisma.wallet.create({
      data: {
        userId: user.id,
        currencyCode: currency.code,
        balance: 0,
        createdAt: now,
        updatedAt: now
      }
    });
  }
  await prisma.settings.create({
    data: {
      userId: user.id,
      preferences: { notifications: true },
      createdAt: now,
      updatedAt: now
    }
  });
  const response = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    twoFactorEnabled: user.twoFactorEnabled
  };
  if (twoFactorSecret) {
    response.twoFactorSecret = twoFactorSecret;
  }
  res.status(201).json(response);
}

async function login(req, res) {
  const { email, password, twoFactorToken, deviceFingerprint } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  if (user.twoFactorEnabled) {
    if (!twoFactorToken) {
      res.status(401).json({ message: 'Two-factor token required' });
      return;
    }
    const valid = verifyTOTP(user.twoFactorSecret, twoFactorToken);
    if (!valid) {
      res.status(401).json({ message: 'Invalid two-factor token' });
      return;
    }
  }
  let fingerprintRecord = null;
  if (deviceFingerprint) {
    fingerprintRecord = await prisma.deviceFingerprint.findFirst({ where: { fingerprint: deviceFingerprint, userId: user.id } });
    if (!fingerprintRecord) {
      fingerprintRecord = await prisma.deviceFingerprint.create({
        data: {
          userId: user.id,
          fingerprint: deviceFingerprint,
          createdAt: new Date().toISOString()
        }
      });
    }
  }
  const access = createAccessToken(user);
  const refresh = createRefreshToken();
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      refreshTokenHash: hashToken(refresh.token),
      expiresAt: new Date(refresh.expiresAt * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deviceFingerprintId: fingerprintRecord ? fingerprintRecord.id : null
    }
  });
  await redis.set(`session:${session.id}`, JSON.stringify({ userId: user.id, sessionId: session.id }), config.redis.ttl);
  res.json({
    tokenType: 'Bearer',
    accessToken: access.token,
    accessTokenExpiresAt: access.expiresAt,
    refreshToken: refresh.token,
    refreshTokenExpiresAt: refresh.expiresAt,
    sessionId: session.id,
    twoFactorEnabled: user.twoFactorEnabled
  });
}

async function refresh(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }
  const refreshHash = hashToken(refreshToken);
  const session = await prisma.session.findFirst({ where: { refreshTokenHash: refreshHash } });
  if (!session) {
    res.status(401).json({ message: 'Invalid session' });
    return;
  }
  if (new Date(session.expiresAt).getTime() < Date.now()) {
    await prisma.session.deleteMany({ where: { id: session.id } });
    await redis.del(`session:${session.id}`);
    res.status(401).json({ message: 'Session expired' });
    return;
  }
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) {
    res.status(401).json({ message: 'Invalid session' });
    return;
  }
  const access = createAccessToken(user);
  const newRefresh = createRefreshToken();
  await prisma.session.update({
    where: { id: session.id },
    data: {
      refreshTokenHash: hashToken(newRefresh.token),
      expiresAt: new Date(newRefresh.expiresAt * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  });
  await redis.set(`session:${session.id}`, JSON.stringify({ userId: user.id, sessionId: session.id }), config.redis.ttl);
  res.json({
    tokenType: 'Bearer',
    accessToken: access.token,
    accessTokenExpiresAt: access.expiresAt,
    refreshToken: newRefresh.token,
    refreshTokenExpiresAt: newRefresh.expiresAt,
    sessionId: session.id
  });
}

async function logout(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }
  const refreshHash = hashToken(refreshToken);
  const session = await prisma.session.findFirst({ where: { refreshTokenHash: refreshHash } });
  if (session) {
    await prisma.session.deleteMany({ where: { id: session.id } });
    await redis.del(`session:${session.id}`);
  }
  res.json({ message: 'Logged out' });
}

module.exports = {
  register,
  login,
  refresh,
  logout
};
