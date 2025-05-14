require('dotenv').config();
const express = require('express');
const routerUser = require('./routes/user.router.js');
const routerBook = require('./routes/book.router.js');
const routerLoan = require('./routes/loan.router.js');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('🟢 MongoDB conectado'))
.catch(console.error);

app.use('/user', routerUser);
app.use('/book', routerBook);
app.use('/loan', routerLoan);

const PORT = 5027
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})