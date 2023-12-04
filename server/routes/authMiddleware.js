const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret'); 
        req.userId = decoded.id; 
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = authMiddleware;
