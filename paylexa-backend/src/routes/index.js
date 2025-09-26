const authController = require('../controllers/authController');
const kycController = require('../controllers/kycController');
const walletController = require('../controllers/walletController');
const statementController = require('../controllers/statementController');
const authMiddleware = require('../middleware/auth');

function registerRoutes(app) {
  app.post('/auth/register', authController.register);
  app.post('/auth/login', authController.login);
  app.post('/auth/refresh', authController.refresh);
  app.post('/auth/logout', authController.logout);

  app.post('/kyc', authMiddleware, kycController.submitKyc);
  app.get('/kyc/status', authMiddleware, kycController.kycStatus);

  app.get('/wallets', authMiddleware, walletController.listWallets);
  app.post('/wallets/top-up', authMiddleware, walletController.topUp);

  app.get('/statements', authMiddleware, statementController.listStatements);
}

module.exports = registerRoutes;
