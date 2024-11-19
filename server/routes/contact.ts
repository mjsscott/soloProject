import express from 'express';
import { submitContactForm } from '../controllers/contactController';


const contactRouter = express.Router();

contactRouter.post('/', submitContactForm);

export default contactRouter;