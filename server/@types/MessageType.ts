import { Request } from "express";
export interface MessageType {
    name: string;
    email: string;
    message: string;
    date: Date;
}
export interface MessageRequest extends Request {
    body: MessageType
}