const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
    loanDate: { type: Date, default: Date.now },
    returnDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'returned'], default: 'active' }
})

module.exports = mongoose.model('loan', loanSchema);