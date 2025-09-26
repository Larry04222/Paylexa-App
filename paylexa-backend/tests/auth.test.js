const { test, beforeEach, afterEach } = require('node:test');
const assert = require('assert/strict');
const { resetDatabase, seedCurrencies, createServer, prisma } = require('./helpers');
const { generateTOTP } = require('../src/utils/totp');

let server;
let baseUrl;

beforeEach(async () => {
  resetDatabase();
  await seedCurrencies();
  const result = await createServer();
  server = result.server;
  baseUrl = result.url;
});

afterEach(async () => {
  if (server) {
    await new Promise(resolve => server.close(resolve));
  }
});

async function post(path, body, token) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });
  const json = await response.json();
  return { status: response.status, body: json };
}

test('registration, login with 2FA, refresh, and logout flow', async () => {
  const registerResponse = await post('/auth/register', {
    email: 'alice@example.com',
    password: 'StrongPass!123',
    fullName: 'Alice Example',
    enableTwoFactor: true
  });
  assert.equal(registerResponse.status, 201);
  assert.ok(registerResponse.body.twoFactorSecret);
  const wallets = await prisma.wallet.findMany({ where: { userId: registerResponse.body.id } });
  assert.equal(wallets.length, 3);

  const totp = generateTOTP(registerResponse.body.twoFactorSecret);
  const loginResponse = await post('/auth/login', {
    email: 'alice@example.com',
    password: 'StrongPass!123',
    twoFactorToken: totp,
    deviceFingerprint: 'device-123'
  });
  assert.equal(loginResponse.status, 200);
  assert.ok(loginResponse.body.accessToken);
  assert.ok(loginResponse.body.refreshToken);

  const refreshResponse = await post('/auth/refresh', {
    refreshToken: loginResponse.body.refreshToken
  });
  assert.equal(refreshResponse.status, 200);
  assert.notEqual(refreshResponse.body.accessToken, loginResponse.body.accessToken);

  const logoutResponse = await post('/auth/logout', {
    refreshToken: refreshResponse.body.refreshToken
  });
  assert.equal(logoutResponse.status, 200);
  assert.equal(logoutResponse.body.message, 'Logged out');
});
