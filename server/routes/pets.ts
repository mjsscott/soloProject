import express from 'express';
import { getAllPets, getOnePet, addPet } from '../controllers/petController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllPets); // Public access to view pets
router.get('/:id',getOnePet)
router.post('/', authMiddleware, addPet); // Protected route for adding pets



export default router;