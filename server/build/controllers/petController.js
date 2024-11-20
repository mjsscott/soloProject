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
exports.getOnePet = getOnePet;
const pet_1 = __importDefault(require("../models/pet"));
// Get all pets
function getAllPets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pets = yield pet_1.default.find();
            res.json(pets);
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    });
}
;
// Add a new pet (for shelters)
function addPet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const thisShelter = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const newPet = new pet_1.default(Object.assign(Object.assign({}, req.body), { shelter: thisShelter // Assuming shelter is logged in
             }));
            yield newPet.save();
            res.status(201).json(newPet);
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    });
}
;
//Get one Pet for details
function getOnePet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pet = yield pet_1.default.findById(req.params.id);
            res.json(pet);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch pet details" });
        }
    });
}
;
