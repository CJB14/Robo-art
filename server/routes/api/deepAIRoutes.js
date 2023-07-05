const router = require('express').Router();

const {
   text2img
} = require('../../controllers/deepAIControllers');

//could also just /product not sure
router.post('/text2img', text2img);

module.exports = router;