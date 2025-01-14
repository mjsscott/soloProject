import express from 'express';
import { getAllPets, addPet, editPet, deletePet, getAllMessages } from '../controllers/adminController';
import { authMiddleware } from '../middleware/authMiddleware';

const dashboardRouter = express.Router();
// Pet routes
dashboardRouter.get('/pets', authMiddleware, getAllPets);
dashboardRouter.post('/list', authMiddleware, addPet);
dashboardRouter.put('/pets/:id', authMiddleware, editPet);
dashboardRouter.delete('/pets/:id', authMiddleware, deletePet);


// Message routes
dashboardRouter.get('/messages', authMiddleware, getAllMessages);

export default dashboardRouter;
