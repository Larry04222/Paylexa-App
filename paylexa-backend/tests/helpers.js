const fs = require('fs');
const path = require('path');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

const DB_FILE = path.join(__dirname, '..', 'prisma', 'data.json');

const DEFAULT_STATE = {
  users: [],
  kycs: [],
  wallets: [],
  sessions: [],
  deviceFingerprints: [],
  featureToggles: [],
  statements: [],
  settings: [],
  currencies: []
};

function resetDatabase() {
  const snapshot = JSON.parse(JSON.stringify(DEFAULT_STATE));
  fs.writeFileSync(DB_FILE, JSON.stringify(snapshot, null, 2));
  prisma._db = snapshot;
}

async function seedCurrencies() {
  const now = new Date().toISOString();
  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'NGN', name: 'Nigerian Naira' }
  ];
  for (const currency of currencies) {
    const existing = await prisma.currency.findUnique({ where: { code: currency.code } });
    if (!existing) {
      await prisma.currency.create({
        data: {
          ...currency,
          createdAt: now
        }
      });
    }
  }
}

async function createServer() {
  const server = app.listen(0);
  await new Promise(resolve => server.on('listening', resolve));
  const { port } = server.address();
  return { server, url: `http://127.0.0.1:${port}` };
}

module.exports = {
  resetDatabase,
  seedCurrencies,
  createServer,
  prisma
};
