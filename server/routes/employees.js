const express = require('express');
const router = express.Router();
const EmployeeModel = require('../models/Employee');
const authMiddleware = require('./authMiddleware')

router.post('/employees', authMiddleware, (req, res) => {
    
    const userId = req.userId; 

    EmployeeModel.create({ ...req.body, createdBy: userId })
        .then(employee => res.json(employee))
        .catch(err => res.status(500).json(err));
});

router.get('/employees', authMiddleware, (req, res) => {
    
    const userId = req.userId; 

    EmployeeModel.find({ createdBy: userId })
        .then(employees => res.json(employees))
        .catch(err => res.status(500).json(err));
});

module.exports = router;
