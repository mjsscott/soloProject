const express = require('express');
const { getAllPets, addPet, editPet, deletePet, getAllMessages } = require('../controllers/adminController');
const authMiddleware = require('../build/middleware/authMiddleware');

const dashboardRouter = express.Router();
// Pet routes
dashboardRouter.get('/pets', authMiddleware, getAllPets);
dashboardRouter.post('/list', authMiddleware, addPet);
dashboardRouter.put('/pets/:id', authMiddleware, editPet);
dashboardRouter.delete('/pets/:id', authMiddleware, deletePet);


// Message routes
dashboardRouter.get('/messages', authMiddleware, getAllMessages);

export default dashboardRouter;
