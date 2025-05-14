const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    isbn: { type: String, required: true, unique: true },
    totalQuantity: { type: Number, required: true },
    availableQuantity: { type: Number, required: true }
})

module.exports = mongoose.model('book', bookSchema);