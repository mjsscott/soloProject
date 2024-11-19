"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const dashboardRouter = express_1.default.Router();
// Pet routes
dashboardRouter.get('/pets', authMiddleware_1.authMiddleware, adminController_1.getAllPets);
dashboardRouter.post('/list', authMiddleware_1.authMiddleware, adminController_1.addPet);
dashboardRouter.put('/pets/:id', authMiddleware_1.authMiddleware, adminController_1.editPet);
dashboardRouter.delete('/pets/:id', authMiddleware_1.authMiddleware, adminController_1.deletePet);
// Message routes
dashboardRouter.get('/messages', authMiddleware_1.authMiddleware, adminController_1.getAllMessages);
exports.default = dashboardRouter;
