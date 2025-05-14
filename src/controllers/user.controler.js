require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const { generateTokens } = require('../middlewares/auth.js');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists!' });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User Created!' });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(400).json({ message: 'Invalid credentials!' });

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken; 
    await user.save();

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
}