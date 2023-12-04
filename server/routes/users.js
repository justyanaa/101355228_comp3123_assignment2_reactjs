const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                UserModel.create(req.body)
                    .then(user => res.json(user))
                    .catch(err => res.json(err));
            }
        });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user && user.password === password) {
                const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
                res.json({ message: "Success", token });
            } else {
                res.json("Wrong password or No records found!");
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;
