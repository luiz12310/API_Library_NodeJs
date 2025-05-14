const express = require('express');
const router = express.Router();
const controllers = require('../controllers/loan.controler');
const { verifyToken } = require('../middlewares/auth.js');

router.get('/', controllers.getAllLoans);
router.post('/:id/:email', verifyToken, controllers.createLoan);
router.put(':id/:email', verifyToken, controllers.updateLoan);

module.exports = router;