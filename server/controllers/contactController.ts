import Message from '../models/message';
import { MessageType } from '../@types/Message';
import { Response, Request } from 'express';



export interface MessageRequest extends Request {
    body: MessageType
}

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

