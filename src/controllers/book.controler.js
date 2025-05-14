const Book = require('../models/book.js');
const Loan = require('../models/loan.js');

exports.getAllBooks = async (req, res) => {
    const allBooks = await Book.find()

    res.status(200).json(allBooks);
} 

exports.createBook = async (req, res) => {
    const { title, author, publicationYear, publisher, isbn, totalQuantity, availableQuantity } = req.body;
    const newBook = new Book({ title, author, publicationYear, publisher, isbn, totalQuantity, availableQuantity });

    await newBook.save();
    res.status(201).json(newBook);
}

exports.getBookById = async (req, res) => {
    const { _id } = req.params;
    const book = await Book.findOne({_id})

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(book);
}

exports.updateBook = async (req, res) => {
    const { bookId } = req.params;
    const { title, author, publicationYear, publisher, isbn, totalQuantity, availableQuantity } = req.body;

    const book = await Book.findOne({_id: bookId});
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const loan = await Loan.findOne({ bookId: bookId, status: 'active' });
    if (loan) return res.status(400).json({ message: 'Book is currently on loan' });

    book.title = title;
    book.author = author;
    book.publicationYear = publicationYear;
    book.publisher = publisher;
    book.isbn = isbn;
    book.totalQuantity = totalQuantity;
    book.availableQuantity = availableQuantity;

    await book.save();
    res.status(200).json(book);
}