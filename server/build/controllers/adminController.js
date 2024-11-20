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
exports.getAllPets = getAllPets;
exports.addPet = addPet;
exports.editPet = editPet;
exports.deletePet = deletePet;
exports.getAllMessages = getAllMessages;
const message_1 = __importDefault(require("../models/message"));
const pet_1 = __importDefault(require("../models/pet"));
// Fetch all pets (for shelters to manage)
function getAllPets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pets = yield pet_1.default.find();
            res.status(200).json(pets);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to retrieve pets" });
        }
    });
}
;
// Add a new pet
function addPet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const myPet = req.body;
        try {
            const newPet = new pet_1.default({
                name: myPet.name,
                type: myPet.type,
                age: myPet.age,
                location: myPet.location,
                image: myPet.image,
                shelterName: myPet.shelterName,
            });
            yield newPet.save();
            res.status(201).json(newPet);
        }
        catch (error) {
            res.status(400).json({ error: "Failed to add pet" });
        }
    });
}
;
// Edit an existing pet
function editPet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updatedPet = yield pet_1.default.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(updatedPet);
        }
        catch (error) {
            res.status(400).json({ error: "Failed to update pet" });
        }
    });
}
;
function deletePet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deletedPet = yield pet_1.default.findByIdAndDelete(id);
            if (!deletedPet) {
                res.status(404).json({ message: "Pet not found" });
                return;
            }
            res.status(200).json({ message: "Pet deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ error: "Failed to delete pet" });
        }
    });
}
;
// Fetch all messages
function getAllMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messages = yield message_1.default.find();
            res.status(200).json(messages);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to retrieve messages" });
        }
    });
}
;
