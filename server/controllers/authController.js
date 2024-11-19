const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = new User({ email, password, role });
        await user.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

    




//http://localhost:3000/api/auth/register
/* { "email":"whatever@gamil.com", 
"password":"123456", 
"role":"adopter" } */

//http://localhost:3000/api/auth/login
//genrates a JWT (JSON web token)
/* { "email":"whatever@gamil.com", 
"password":"123456" } */