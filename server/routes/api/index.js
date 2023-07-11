const router = require('express').Router();
const deepAIRoutes = require('./deepAIRoutes.js');

router.use('/Text2Img', deepAIRoutes);

module.exports = router;