const { test, beforeEach, afterEach } = require('node:test');
const assert = require('assert/strict');
const { resetDatabase, seedCurrencies, createServer, prisma } = require('./helpers');

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

async function get(path, token) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  const json = await response.json();
  return { status: response.status, body: json };
}

async function registerAndLogin() {
  const email = 'wallet@example.com';
  const password = 'WalletPass!123';
  const registerResponse = await post('/auth/register', { email, password, fullName: 'Wallet User' });
  assert.equal(registerResponse.status, 201);
  const loginResponse = await post('/auth/login', { email, password });
  assert.equal(loginResponse.status, 200);
  return { userId: registerResponse.body.id, accessToken: loginResponse.body.accessToken };
}

test('wallet listing and top-up statement reconciliation', async () => {
  const { userId, accessToken } = await registerAndLogin();
  const walletsResponse = await get('/wallets', accessToken);
  assert.equal(walletsResponse.status, 200);
  assert.equal(walletsResponse.body.length, 3);
  const usdWallet = walletsResponse.body.find(w => w.currencyCode === 'USD');
  assert.ok(usdWallet);

  const topUpResponse = await post('/wallets/top-up', { currencyCode: 'USD', amount: 150.5, reference: 'TOPUP-001' }, accessToken);
  assert.equal(topUpResponse.status, 200);
  assert.equal(topUpResponse.body.wallet.balance, 150.5);
  assert.equal(topUpResponse.body.statement.reference, 'TOPUP-001');

  const statementsResponse = await get('/statements', accessToken);
  assert.equal(statementsResponse.status, 200);
  assert.equal(statementsResponse.body.length, 1);
  assert.equal(statementsResponse.body[0].amount, 150.5);
  assert.equal(statementsResponse.body[0].walletId, topUpResponse.body.wallet.id);

  const storedWallet = await prisma.wallet.findFirst({ where: { id: usdWallet.id } });
  assert.equal(storedWallet.balance, 150.5);
});
