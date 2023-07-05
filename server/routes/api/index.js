const router = require('express').Router();
const printOrderRoutes = require('./printOrderRoutes.js');
const deepAIRoutes = require('./deepAIRoutes.js');

router.use('/order', printOrderRoutes);
router.use('/product', deepAIRoutes);

module.exports = router;