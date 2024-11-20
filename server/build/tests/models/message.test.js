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
const mongoose_1 = __importDefault(require("mongoose"));
const message_1 = __importDefault(require("../../models/message"));
require('dotenv').config();
const mockMessage = {
    name: 'Mrs. Mock',
    email: 'mock@gamil.com',
    message: 'Hello. Are your tests working?',
    date: new Date(Date.now()),
};
describe("Message Model Tests", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to an in-memory MongoDB instance or your test DB before tests run
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Disconnect from the database after tests are complete
        yield mongoose_1.default.connection.dropDatabase();
        yield mongoose_1.default.connection.close();
    }));
    it("should create and save a message", () => __awaiter(void 0, void 0, void 0, function* () {
        const messageToSave = new message_1.default(mockMessage);
        yield messageToSave.save().then(() => {
            expect(messageToSave.message).toBe('Hello. Are your tests working?');
        });
    }));
});
