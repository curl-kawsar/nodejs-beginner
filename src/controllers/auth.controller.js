const User = require('../models/User');
const passwordHash = require('../lib/passwordHash');
const userValidation = require('../middleware/userValidation');
const jwt = require('jsonwebtoken');

const jwtKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4";

const registration = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // Check if all required fields are present
        if (!email || !name || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = passwordHash(password);

        const newUser = new User({ email, name, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const hashedPassword = passwordHash(password);
        if (hashedPassword !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { registration, login, getUsers, getOneUser };