const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName }).select('+password');

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            'secretkey',
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
