const router = require('express').Router();
const deepAIRoutes = require('./deepAIRoutes.js');

router.use('/text2img', deepAIRoutes);

module.exports = router;