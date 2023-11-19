var express = require('express');
var router = express.Router();
var { verifyLogin,checkAdmin } = require('../middleware/auth')

//controller
const { getAlluser,getUser } = require('../controller/userController');

// /* GET users listing. */
router.get('/',verifyLogin,checkAdmin, getAlluser);
router.get('/:id',verifyLogin,checkAdmin, getUser);


module.exports = router;
