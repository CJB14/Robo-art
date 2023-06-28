const router = require('express').Router();

const {
   createUser,
   getUser
} = require('../../controllers/userControllers');

router.post('/users/:userId', createUser);
router.get('/users', getUser);

//maybe do a delete and put/update route for user as well

module.exports = router;