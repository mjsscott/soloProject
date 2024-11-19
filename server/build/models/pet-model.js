"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const petSchema = new mongoose.Schema({
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
    city: String,
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
exports.default = mongoose.model("Pet", petSchema);
