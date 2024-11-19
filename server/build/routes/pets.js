"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const petController_1 = require("../controllers/petController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', petController_1.getAllPets); // Public access to view pets
router.get('/:id', petController_1.getOnePet);
router.post('/', authMiddleware_1.authMiddleware, petController_1.addPet); // Protected route for adding pets
exports.default = router;
