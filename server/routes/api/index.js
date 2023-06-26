//TO DO
//SHOULD INCLUDE DEEP AI API ROUTES TOO

const router = require('express').Router();
const stripeRoutes = require('./stripeRoutes.js');
const printOrderRoutes = require('./printOrderRoutes.js');
const userRoutes = require('./userRoutes.js')

//this has to match whatever webhook endpoint i configure - important 4 deployment
router.use('/webook', stripeRoutes);
router.use('/order', printOrderRoutes);
router.use('/user', userRoutes);

module.exports = router;