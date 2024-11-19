const express = require('express');
const { getAllPets, addPet,getOnePet } = require('../controllers/petController');
const authMiddleware = require('../build/middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllPets); // Public access to view pets
router.get('/:id',getOnePet)
router.post('/', authMiddleware, addPet); // Protected route for adding pets




module.exports = router;