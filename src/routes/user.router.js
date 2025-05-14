const express = require('express');
const controllers = require('../controllers/user.controler.js');

const router = express.Router();

router.post('/register', controllers.register);
router.post('/login', controllers.login);

module.exports = router;