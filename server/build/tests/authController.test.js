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
const authController_1 = require("../controllers/authController");
const user_1 = __importDefault(require("../models/user"));
const globals_1 = require("@jest/globals");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
jest.mock('../models/user');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');
const MockUser = user_1.default;
const MockBcrypt = bcrypt_1.default;
const MockJwt = jsonwebtoken_1.default;
(0, globals_1.describe)('Auth Controller - Register', () => {
    let req;
    let res;
    let mockJson;
    let mockStatus;
    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
                role: 'adopter',
            },
        };
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnThis();
        res = {
            status: mockStatus,
            json: mockJson,
            jsonp: mockJson,
        };
        jest.clearAllMocks();
    });
    (0, globals_1.it)('should register user on success', () => __awaiter(void 0, void 0, void 0, function* () {
        const saveMock = jest.fn().mockResolvedValueOnce({
            _id: 'mockedUserId',
            email: 'test@example.com',
            role: 'adopter',
        });
        MockUser.mockImplementation(() => {
            return {
                save: saveMock,
                _id: 'mockedUserId',
                email: 'test@example.com',
                role: 'adopter',
            };
        });
        yield (0, authController_1.register)(req, res);
        (0, globals_1.expect)(saveMock).toHaveBeenCalledTimes(1);
        (0, globals_1.expect)(mockStatus).toHaveBeenCalledWith(201);
        (0, globals_1.expect)(mockJson).toBeCalledWith({
            message: 'User registered successfully',
            user: {
                id: 'mockedUserId',
                email: 'test@example.com',
                role: 'adopter',
            },
        });
    }));
    (0, globals_1.it)('should handle a database save error', () => __awaiter(void 0, void 0, void 0, function* () {
        const saveMock = jest.fn().mockRejectedValueOnce(new Error('Database save failed'));
        MockUser.mockImplementation(() => {
            return {
                save: saveMock,
            };
        });
        yield (0, authController_1.register)(req, res);
        (0, globals_1.expect)(saveMock).toBeCalledTimes(1);
        (0, globals_1.expect)(mockStatus).toHaveBeenCalledWith(400);
        (0, globals_1.expect)(mockJson).toBeCalledWith({
            error: 'Database save failed',
        });
    }));
    (0, globals_1.it)('should handle missing fields in request body', () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = {};
        yield (0, authController_1.register)(req, res);
        (0, globals_1.expect)(mockStatus).toHaveBeenCalledWith(400);
        (0, globals_1.expect)(mockJson).toBeCalledWith({
            error: 'email, password and role are expected fields'
        });
    }));
    (0, globals_1.it)('should handle unexpected errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const saveMock = jest.fn().mockImplementationOnce(() => {
            throw new Error('Unexpected server error');
        });
        MockUser.mockImplementation(() => {
            return {
                save: saveMock,
            };
        });
        yield (0, authController_1.register)(req, res);
        (0, globals_1.expect)(saveMock).toHaveBeenCalledTimes(1);
        (0, globals_1.expect)(mockStatus).toHaveBeenCalledWith(400);
        (0, globals_1.expect)(mockJson).toBeCalledWith({
            error: 'Unexpected server error',
        });
    }));
});
(0, globals_1.describe)('Auth Controller - Login', () => {
    let req;
    let res;
    let mockJson;
    let mockStatus;
    beforeEach(() => {
        process.env.JWT_SECRET = 'mockedSecret';
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnThis();
        res = {
            status: mockStatus,
            json: mockJson,
            jsonp: mockJson,
        };
        MockJwt.sign.mockImplementation(() => 'mockedToken');
        MockBcrypt.compare.mockResolvedValue(true);
        MockUser.findOne.mockResolvedValue({
            _id: 'mockedUserId',
            email: 'test@example.com',
            password: 'hashedPassword123',
            role: 'adopter',
        });
    });
    (0, globals_1.it)("Should log in user with correct credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        yield (0, authController_1.login)(req, res);
        (0, globals_1.expect)(MockUser.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
        (0, globals_1.expect)(MockBcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword123");
        (0, globals_1.expect)(mockStatus).toHaveBeenCalledWith(200);
        (0, globals_1.expect)(mockJson).toHaveBeenCalledWith({
            token: 'mockedToken',
            role: "adopter"
        });
    }));
    (0, globals_1.it)("Should return 401 when user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        MockUser.findOne.mockResolvedValue(null);
        const req = {
            body: {
                email: 'nonexistent@example.com',
                password: 'password123',
            }
        };
        yield (0, authController_1.login)(req, res);
        (0, globals_1.expect)(mockStatus).toHaveBeenCalledWith(401);
        (0, globals_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    }));
    (0, globals_1.it)("Should return 401 when password does not match", () => __awaiter(void 0, void 0, void 0, function* () {
        MockUser.findOne.mockResolvedValue(null);
        const req = {
            body: {
                email: 'test@example.com',
                password: 'wrongpassword123',
            }
        };
        yield (0, authController_1.login)(req, res);
        (0, globals_1.expect)(mockStatus).toHaveBeenCalledWith(401);
        (0, globals_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    }));
    (0, globals_1.it)('Should generate a JWT for valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        yield (0, authController_1.login)(req, res);
        (0, globals_1.expect)(MockJwt.sign).toBeCalledWith({ id: 'mockedUserId', role: 'adopter' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }));
    (0, globals_1.it)('should return 400 for missing email or password', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {},
        };
        yield (0, authController_1.login)(req, res);
        (0, globals_1.expect)(mockStatus).toHaveBeenCalledWith(400);
        (0, globals_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Email and password are required' });
    }));
    (0, globals_1.it)('should return 500 for unexpected server errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error('Unexpected error');
        MockUser.findOne.mockRejectedValueOnce(error); // Simulate DB failure
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        yield (0, authController_1.login)(req, res);
        (0, globals_1.expect)(mockStatus).toHaveBeenCalledWith(500);
        (0, globals_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Server error' });
    }));
});
