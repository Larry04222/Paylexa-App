const prisma = require('../config/prisma');

async function listStatements(req, res) {
  const { walletId } = req.query;
  let statements = [];
  if (walletId) {
    const wallet = await prisma.wallet.findFirst({ where: { id: walletId, userId: req.user.id } });
    if (!wallet) {
      res.status(404).json({ message: 'Wallet not found' });
      return;
    }
    statements = await prisma.statement.findMany({ where: { walletId } });
  } else {
    statements = await prisma.statement.findMany({ where: { userId: req.user.id } });
  }
  statements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(statements);
}

module.exports = {
  listStatements
};
