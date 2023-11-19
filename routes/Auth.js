var express = require('express');
var router = express.Router();

const { UserRegister,login } = require('../controller/authController');

router.post('/register', UserRegister);
router.post('/login', login);

module.exports = router;
