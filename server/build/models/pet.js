"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const petSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true, // e.g., Dog, Cat
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    breed: String,
    age: Number,
    gender: String,
    location: {
        lat: Number,
        lng: Number,
    },
    city: String || null,
    description: String,
    image: String, //file or url for pet's image
    available: {
        type: Boolean,
        default: true,
    },
    shelterName: String,
    phone: String,
    email: String,
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Pet", petSchema);
