const router = require('express').Router();

const {
   text2img
} = require('../../controllers/deepAIController.js');

//could also just /product not sure
router.post('/', text2img);

module.exports = router;