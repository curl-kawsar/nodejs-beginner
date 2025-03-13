const User = require('../models/User');

const userValidation = async (req, res, next) => {
    const { email } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    next();
}

module.exports = userValidation;