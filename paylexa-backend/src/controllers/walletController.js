const prisma = require('../config/prisma');

async function listWallets(req, res) {
  const wallets = await prisma.wallet.findMany({ where: { userId: req.user.id } });
  const currencies = await prisma.currency.findMany();
  const currencyMap = new Map(currencies.map(c => [c.code, c]));
  res.json(wallets.map(wallet => ({
    id: wallet.id,
    balance: wallet.balance,
    currencyCode: wallet.currencyCode,
    currencyName: currencyMap.get(wallet.currencyCode)?.name || wallet.currencyCode,
    updatedAt: wallet.updatedAt
  })));
}

async function topUp(req, res) {
  const { currencyCode, amount, reference } = req.body;
  if (!currencyCode || typeof amount !== 'number' || amount <= 0) {
    res.status(400).json({ message: 'Currency code and positive amount are required' });
    return;
  }
  const wallet = await prisma.wallet.findFirst({ where: { userId: req.user.id, currencyCode } });
  if (!wallet) {
    res.status(404).json({ message: 'Wallet not found' });
    return;
  }
  const newBalance = Number(wallet.balance || 0) + amount;
  const updated = await prisma.wallet.update({
    where: { id: wallet.id },
    data: {
      balance: newBalance,
      updatedAt: new Date().toISOString()
    }
  });
  const statement = await prisma.statement.create({
    data: {
      walletId: wallet.id,
      userId: req.user.id,
      type: 'CREDIT',
      amount,
      balanceAfter: newBalance,
      reference: reference || `TOPUP-${Date.now()}`,
      metadata: {},
      createdAt: new Date().toISOString()
    }
  });
  res.json({
    wallet: updated,
    statement
  });
}

module.exports = {
  listWallets,
  topUp
};
