import express from 'express';
import { getAllFavorites, toggleFavoriteStatus } from '../controllers/favoriteController';
import { authMiddleware } from '../middleware/authMiddleware';

const favoriteRouter = express.Router();

// Add pet to favorites
favoriteRouter.post('/:id/toggle', authMiddleware, toggleFavoriteStatus);


// Get user's favorite pets
favoriteRouter.get('/', authMiddleware, getAllFavorites);

export default favoriteRouter;