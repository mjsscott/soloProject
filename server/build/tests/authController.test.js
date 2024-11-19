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
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const globals_1 = require("@jest/globals");
jest.mock('../models/user');
(0, globals_1.describe)('Auth Controller - Register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    (0, globals_1.test)('should save user and return success response', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            _id: '12345',
            email: 'test@example.com',
            role: 'adopter',
            save: jest.fn().mockResolvedValue({
                _id: '12345',
                email: 'test@example.com',
                role: 'adopter'
            })
        };
        jest.spyOn(user_1.default.prototype, 'save').mockResolvedValue(mockUser);
        const req = node_mocks_http_1.default.createRequest({
            method: 'POST',
            body: { email: 'test@example.com', password: 'password123', role: 'adopter' }
        });
        const res = node_mocks_http_1.default.createResponse();
        yield (0, authController_1.register)(req, res);
        (0, globals_1.expect)(res.statusCode).toBe(201);
        (0, globals_1.expect)(res._getJSONData()).toEqual({
            message: 'User registered successfully',
            user: { id: '12345', email: 'test@example.com', role: 'adopter' },
        });
    }));
});
