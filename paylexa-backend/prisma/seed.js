const prisma = require('../src/config/prisma');

async function main() {
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
          createdAt: new Date().toISOString()
        }
      });
    }
  }
  console.log('Seed completed');
}

main().then(() => prisma.$disconnect());
