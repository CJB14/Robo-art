const router = require('express').Router();
const printOrderRoutes = require('./printOrderRoutes.js');

router.use('/order', printOrderRoutes);

module.exports = router;