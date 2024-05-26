const jwt = require('jsonwebtoken');

const { jwtPassword } = require('../config/config');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(403).json({ message: 'Token format is invalid' });
    }

    jwt.verify(tokenParts[1], jwtPassword, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.personId;
        req.userType = decoded.personType;
        next();
    });
}

module.exports = verifyToken;
