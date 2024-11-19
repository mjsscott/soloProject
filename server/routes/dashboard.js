const express = require('express');
const { getAllPets, addPet, editPet, deletePet, getAllMessages } = require('../controllers/adminController');
const authMiddleware = require('../build/middleware/authMiddleware');

const router = express.Router();
// Pet routes
router.get('/pets', authMiddleware, getAllPets);
router.post('/list', authMiddleware, addPet);
router.put('/pets/:id', authMiddleware, editPet);
router.delete('/pets/:id', authMiddleware, deletePet);


// Message routes
router.get('/messages', authMiddleware, getAllMessages);

module.exports = router;
