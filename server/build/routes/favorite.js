"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favoriteController_1 = require("../controllers/favoriteController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const favoriteRouter = express_1.default.Router();
// Add pet to favorites
favoriteRouter.post('/:id/toggle', authMiddleware_1.authMiddleware, favoriteController_1.toggleFavoriteStatus);
// Get user's favorite pets
favoriteRouter.get('/', authMiddleware_1.authMiddleware, favoriteController_1.getAllFavorites);
exports.default = favoriteRouter;
