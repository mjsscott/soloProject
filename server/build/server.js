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
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const pets_1 = __importDefault(require("./routes/pets"));
const contact_1 = __importDefault(require("./routes/contact"));
const favorite_1 = __importDefault(require("./routes/favorite"));
const pet_model_1 = __importDefault(require("./models/pet-model"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const mockPets = [
    {
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
        favorite: false,
    },
    {
        name: 'Luci',
        type: 'cat',
        age: 3,
        location: { lat: 51.5074, lng: -0.1278 },
        city: 'London',
        shelterName: 'Together',
        phone: '123456789',
        email: 'together@gmail.com',
        image: '/images/luci.jpg',
        gender: 'Female',
        favorite: false,
    },
    {
        name: 'Tom',
        type: 'Cat',
        age: 1,
        location: { lat: 53.483959, lng: -2.244644 },
        city: 'Manchester',
        shelterName: 'Adoption Centre',
        phone: '123456789',
        email: 'adopt@gmail.com',
        image: '/images/tom.jpg',
        gender: 'Male',
        favorite: false,
    },
    {
        name: 'Fluffy',
        type: 'Rabbit',
        age: 1,
        location: { lat: 55.9533, lng: -3.1883 },
        city: 'Edinburgh',
        sshelterName: 'Lives',
        phone: '123456789',
        email: 'lives@gmail.com',
        image: '/images/fluffy.jpg',
        gender: 'Male',
        favorite: false,
    },
    {
        name: 'Charlie',
        type: 'Dog',
        age: 5,
        location: { lat: 52.4862, lng: -1.8904 },
        city: 'Birmingham',
        shelterName: 'Bham Pets',
        phone: '123456789',
        email: 'bham@gemail.com',
        image: '/images/charlie.jpg',
        gender: 'Male',
        favorite: false,
    },
    {
        name: 'Bella',
        type: 'Cat',
        age: 2,
        location: { lat: 51.4545, lng: -2.5879 },
        city: 'Bristol',
        shelterName: 'Your Pet',
        phone: '123456789',
        email: 'your@gmail.com',
        image: '/images/bella.jpg',
        gender: 'Female',
        favorite: false,
    },
    {
        name: 'Violla',
        type: 'Dog',
        age: 4,
        location: { lat: 53.4084, lng: -2.9916 },
        city: 'Liverpool',
        shelterName: 'Together in Liverpool',
        phone: '123456789',
        email: 'togetherliverpool@gmail.com',
        image: '/images/violla.jpg',
        gender: 'Female',
        favorite: false,
    },
    {
        name: 'Shadow',
        type: 'Cat',
        age: 4,
        location: { lat: 51.752, lng: -1.2577 },
        city: 'Oxford',
        shelterName: 'Save Lives',
        phone: '123456789',
        email: 'save@gmail.com',
        image: '/images/shadow.jpg',
        gender: 'Male',
        favorite: false,
    },
    {
        name: 'Snowball',
        type: 'Rabbit',
        age: 2,
        location: { lat: 51.4543, lng: -0.9781 },
        city: 'Reading',
        shelterName: 'The Home',
        phone: '123456789',
        email: 'home@gmail.com',
        image: '/images/snowball.jpg',
        gender: 'Female',
        favorite: false,
    },
    {
        name: 'Rocky',
        type: 'Dog',
        age: 5,
        location: { lat: 52.2053, lng: 0.1218 },
        city: 'Cambridge',
        shelterName: 'The Home Cambridge',
        phone: '123456789',
        email: 'homecambridge@gamil.com',
        image: '/images/rocky.jpg',
        gender: 'Male',
        favorite: false,
    },
    {
        name: 'Ginger',
        type: 'Cat',
        age: 3,
        location: { lat: 53.8008, lng: -1.5491 },
        city: 'Leeds',
        shelterName: 'Shelter',
        phone: '123456789',
        email: 'shelter@gamil.com',
        image: '/images/ginger.jpg',
        gender: 'Female',
        favorite: false,
    },
];
//middleware
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/*
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await mongoose.connection.db.dropCollection('pets');
        console.log('Dropped pets collection');
        mongoose.connection.close();
    })
    .catch(error => console.error('Error dropping collection:', error));
 */
// MongoDB connection and mock data insertion
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to MongoDB');
    // Insert mock data if the collection is empty
    const existingPets = yield pet_model_1.default.countDocuments();
    if (existingPets === 0) {
        yield pet_model_1.default.insertMany(mockPets);
        console.log('Mock pets data inserted');
    }
    else {
        console.log('Pets collection already populated');
    }
}))
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});
//routes
app.use('/auth', auth_1.default);
app.use('/pets', pets_1.default);
app.use('/contact', contact_1.default);
app.use('/dashboard', dashboard_1.default);
app.use('/favorite', favorite_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
