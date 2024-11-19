import express from "express";
import { register, login } from '../controllers/authController';

const router = express.Router();

export const registerRouter = router.post('/register', register);
export const loginRouter = router.post('/login', login);

