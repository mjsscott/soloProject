import { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//Loading env variables from .env
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

// Register a new user
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;
        if (!email||!password||!role) {
          throw new Error('email, password and role are expected fields');
        }
        const user = new User({ email, password, role });
        await user.save();
        res.status(201).jsonp({ 
            message: 'User registered successfully', 
            user: { id: user._id, email: user.email, role: user.role}
        });
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ error: typedError.message });
    }
};

// Login a user
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
        }

        const user = await User.findOne({ email });
        if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
        }

        console.log('JWT_SECRET in function:', process.env.JWT_SECRET);
        // Generate JWT token
        if (typeof process.env.JWT_SECRET === undefined) {
            console.log("BONGOHORSE");
            res.status(500).json({ error: 'JWT_SECRET is not defined in environment variables'});
            return;
          }
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1d' });

        res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
