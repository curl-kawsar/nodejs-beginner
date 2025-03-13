const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4"

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwtKey);
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
}

module.exports = auth;