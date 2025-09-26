const app = require('./app');
const config = require('./config/env');
const prisma = require('./config/prisma');

(async () => {
  await prisma.$connect();
  app.listen(config.app.port, () => {
    console.log(`Server running on port ${config.app.port}`);
  });
})();
