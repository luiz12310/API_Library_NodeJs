const Loan = require('../models/loan');
const Book = require('../models/book');
const User = require('../models/user');

exports.getAllLoans = async (req, res) =>{
    const allLoans = await Loan.find()

    res.status(200).json(allLoans);
}

exports.createLoan = async (req, res) => {
    const { id, email } = req.params;

    const existingUser = await User.findOne({email});
    if (!existingUser) return res.status(404).json({ message: 'User not found' });

    const existingBook = await Book.findOne({_id: id});
    if (!existingBook) return res.status(404).json({ message: 'Book not found' });

    if (existingBook.availableQuantity <= 0) return res.status(400).json({ message: 'No available copies' });
    
    existingBook.availableQuantity -= 1;

    await existingBook.save();

    var devolution = new Date();
    devolution.setDate(devolution.getDate() + 7);
    devolution = devolution.toISOString().split('T')[0];

    const newLoan = new Loan({ userId: existingUser._id, bookId: id, returnDate: devolution, status: 'active' });
    await newLoan.save();

    res.status(201).json(newLoan);
}

exports.updateLoan = async (req, res) => {
    const { id, email } = req.params;

    const existingUser = await User.find({email});
    if (!existingUser) return res.status(404).json({ message: 'User not found' });

    const existingBook = await Book.findOne({_id: id});
    if (!existingBook) return res.status(404).json({ message: 'Book not found' });

    const existingLoan = await Loan.findOne({userId: existingUser._id, bookId: id});
    if (!existingLoan) return res.status(404).json({ message: 'Loan not found' });

    if (existingLoan.status === 'active') {
        existingLoan.status = 'returned';
        existingBook.availableQuantity += 1;
    } 
    
    await existingLoan.save();
    await existingBook.save();
    res.status(200).json(existingLoan);
}