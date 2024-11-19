import Message from '../models/message-model';
import { MessageRequest, MessageType } from '../types/MessageType';
import { Response } from 'express';




export async function submitContactForm (req: MessageRequest, res: Response) {
const myMessage = req.body;
    try {
        const newMessage = new Message(myMessage);
        await newMessage.save();
        res.json();
    } catch (error) {
        console.error('Error saving message:', error);
        res.json();
    }
}

