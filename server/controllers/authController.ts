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
        const user = new User({ email, password, role });
        await user.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ error: typedError.message });
    }
};

// Login a user
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
        }


        // Generate JWT token
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
          }
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1d' });

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};