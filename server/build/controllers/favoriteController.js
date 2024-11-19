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
const pet_model_1 = __importDefault(require("../models/pet-model"));
// Toggle favorite status of a pet
exports.toggleFavoriteStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: petId } = req.params;
    try {
        const pet = yield pet_model_1.default.findById(petId);
        if (!pet)
            return res.status(404).json({ error: "Pet not found" });
        pet.favorite = !pet.favorite; // Toggle favorite status
        yield pet.save();
        res
            .status(200)
            .json({ message: `Favorite status updated to ${pet.favorite}`, pet });
    }
    catch (error) {
        console.error("Error toggling favorite status:", error);
        res.status(500).json({ error: "Failed to toggle favorite status" });
    }
});
// Get user's favorite pets
exports.getAllFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favoritePets = yield pet_model_1.default.find({ favorite: true });
        res.status(200).json(favoritePets);
    }
    catch (error) {
        console.error("Error fetching favorite pets:", error);
        res.status(500).json({ error: "Failed to fetch favorite pets" });
    }
});
