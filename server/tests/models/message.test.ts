import mongoose from "mongoose";
import message from "../../models/message";
import { MessageType } from "../../@types/Message";
require('dotenv').config();

const mockMessage: MessageType = {
    name: 'Mrs. Mock',
    email: 'mock@gamil.com',
    message: 'Hello. Are your tests working?',
    date: new Date(Date.now()),
}

describe("Message Model Tests", () => {
    beforeAll(async () => {
        // Connect to an in-memory MongoDB instance or your test DB before tests run
        await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
        // Disconnect from the database after tests are complete
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("should create and save a message", async () => {


        const messageToSave = new message(mockMessage)
        await messageToSave.save().then(
           ()=>{
                expect(messageToSave.message).toBe('Hello. Are your tests working?')
           }
        );

    });


});
