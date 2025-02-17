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
const pet_1 = __importDefault(require("../../models/pet"));
require('dotenv').config();
const generate24CharId = () => {
    return crypto.randomUUID().replace(/-/g, '').substring(0, 24);
};
const mockPets = [
    {
        _id: generate24CharId(),
        name: 'Buddy',
        type: 'Dog',
        age: 3,
        location: { lat: 51.5074, lng: -0.1278 },
        city: 'London',
        shelterName: 'Together',
        phone: '123456789',
        email: 'together@gmail.com',
        image: '/images/buddy.jpg',
        gender: 'Male',
        breed: 'Labrador Retriever',
        favorite: false,
        available: true,
        description: 'Buddy is an energetic and friendly Labrador who loves playing fetch and is great with kids!',
    },
    {
        _id: '13421402',
        name: 'Luci',
        type: 'Cat',
        age: 3,
        location: { lat: 51.5074, lng: -0.1278 },
        city: 'London',
        shelterName: 'Together',
        phone: '123456789',
        email: 'together@gmail.com',
        image: '/images/luci.jpg',
        gender: 'Female',
        breed: 'Siamese',
        favorite: false,
        available: true,
        description: 'Luci is a calm and affectionate Siamese cat who enjoys lounging in sunny spots and loves human company.',
    }
];
describe("Pet Model Tests", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to an in-memory MongoDB instance or your test DB before tests run
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Disconnect from the database after tests are complete
        yield mongoose_1.default.connection.dropDatabase();
        yield mongoose_1.default.connection.close();
    }));
    it("should create a new pet without specifying _id", () => __awaiter(void 0, void 0, void 0, function* () {
        const petData = mockPets[1];
        const pet = new pet_1.default(petData);
        yield pet.save();
        expect(pet._id).toBeDefined();
        expect(pet.name).toBe("Rex");
        expect(pet.type).toBe("Dog");
        expect(pet.breed).toBe("Bulldog");
        expect(pet.age).toBe(3);
        expect(pet.gender).toBe("Male");
        expect(pet.city).toBe("New York");
        expect(pet.favorite).toBe(false);
        expect(pet.available).toBe(true);
        expect(pet.createdAt).toBeDefined();
        expect(pet.updatedAt).toBeDefined();
        expect(new Date(pet.createdAt)).toBeInstanceOf(Date);
        expect(new Date(pet.updatedAt)).toBeInstanceOf(Date);
    }));
    it("should enforce required fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidPet = new pet_1.default({
            type: "Cat",
        });
        let error;
        try {
            yield invalidPet.save();
        }
        catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
    }));
    it("should set default values for 'favorite' and 'available'", () => __awaiter(void 0, void 0, void 0, function* () {
        const petData = {
            name: "Fluffy",
            type: "Cat",
        };
        const pet = new pet_1.default(petData);
        yield pet.save();
        expect(pet.favorite).toBe(false);
        expect(pet.available).toBe(true);
    }));
    it("should correctly update a pet", () => __awaiter(void 0, void 0, void 0, function* () {
        const pet = new pet_1.default({
            name: "Bella",
            type: "Dog",
        });
        yield pet.save();
        pet.city = "Los Angeles";
        yield pet.save();
        const updatedPet = yield pet_1.default.findById(pet._id);
        expect(updatedPet).toBeTruthy();
    }));
});
