"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//Loading env variables from .env
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET;
// Register a new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        const user = new user_1.default({ email, password, role });
        yield user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        const typedError = error;
        res.status(400).json({ error: typedError.message });
    }
});
exports.register = register;
// Login a user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate JWT token
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1d' });
        res.json({ token, role: user.role });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.login = login;
