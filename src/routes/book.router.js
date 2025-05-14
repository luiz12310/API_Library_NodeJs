const express = require('express');
const router = express.Router();
const controllers = require('../controllers/book.controler');
const { verifyAdmin } = require('../middlewares/auth.js');

router.get('/', controllers.getAllBooks);
router.get('/:_id', controllers.getBookById);

// Verify if Admin
router.post('/register', verifyAdmin, controllers.createBook);
router.put('/update/:bookId', verifyAdmin, controllers.updateBook);

module.exports = router;