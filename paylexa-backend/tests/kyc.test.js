const { test, beforeEach, afterEach } = require('node:test');
const assert = require('assert/strict');
const { resetDatabase, seedCurrencies, createServer } = require('./helpers');

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
  const email = 'kyc@example.com';
  const password = 'KycPass!123';
  await post('/auth/register', { email, password, fullName: 'Kyc User' });
  const loginResponse = await post('/auth/login', { email, password });
  return loginResponse.body.accessToken;
}

test('kyc submission and status retrieval', async () => {
  const token = await registerAndLogin();
  const submitResponse = await post('/kyc', {
    documentType: 'PASSPORT',
    documentNumber: 'A1234567',
    metadata: { country: 'CA' }
  }, token);
  assert.equal(submitResponse.status, 201);
  assert.equal(submitResponse.body.status, 'PENDING');

  const statusResponse = await get('/kyc/status', token);
  assert.equal(statusResponse.status, 200);
  assert.equal(statusResponse.body.status, 'PENDING');

  const updateResponse = await post('/kyc', {
    documentType: 'PASSPORT',
    documentNumber: 'B7654321',
    metadata: { country: 'US' }
  }, token);
  assert.equal(updateResponse.status, 200);
  assert.equal(updateResponse.body.documentNumber, 'B7654321');
});
