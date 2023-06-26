//TO DO
//SHOULD INCLUDE DEEP AI API ROUTES TOO
const router = require('express').Router();
const stripeRoutes = require('./stripeRoutes');
const printOrderRoutes = require('./printOrderRoutes.js');

router.use('/payment', stripeRoutes);
router.use('/order', printOrderRoutes);

module.exports = router;