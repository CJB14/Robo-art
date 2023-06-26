//TO DO 
//ADD OTHER NON-API ROUTES IF NECESSARY

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;
