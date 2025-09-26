const prisma = require('../config/prisma');

async function submitKyc(req, res) {
  const { documentType, documentNumber, metadata } = req.body;
  if (!documentType || !documentNumber) {
    res.status(400).json({ message: 'Document type and number are required' });
    return;
  }
  const now = new Date().toISOString();
  const existing = await prisma.kyc.findFirst({ where: { userId: req.user.id } });
  if (existing) {
    const updated = await prisma.kyc.update({
      where: { id: existing.id },
      data: {
        documentType,
        documentNumber,
        metadata: metadata || {},
        status: 'PENDING',
        updatedAt: now
      }
    });
    res.json(updated);
    return;
  }
  const created = await prisma.kyc.create({
    data: {
      userId: req.user.id,
      documentType,
      documentNumber,
      metadata: metadata || {},
      status: 'PENDING',
      createdAt: now,
      updatedAt: now
    }
  });
  res.status(201).json(created);
}

async function kycStatus(req, res) {
  const record = await prisma.kyc.findFirst({ where: { userId: req.user.id } });
  if (!record) {
    res.json({ status: 'NOT_SUBMITTED' });
    return;
  }
  res.json({ status: record.status, updatedAt: record.updatedAt });
}

module.exports = {
  submitKyc,
  kycStatus
};
