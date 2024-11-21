import mongoose, { Types } from "mongoose";
import User from "../../models/user";
import { IUser,  } from "../../models/user";
require('dotenv').config();
import { Document } from "mongoose";

const mockUser: IUser = {
    _id: new Types.ObjectId(),
    email: 'mock@gamil.com',
    password: 'passWord123$?',
    role: 'shelter',
    comparePassword: (candidatePassword: string): Promise<boolean> => {
        return new Promise((resolve) => {
            resolve(candidatePassword === 'passWord123$?');
        });
    },
    save: jest.fn()

} as unknown as IUser;


describe("User Model Tests", () => {
    beforeAll(async () => {
        // Connect to an in-memory MongoDB instance or your test DB before tests run
        await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
        // Disconnect from the database after tests are complete
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("should check the user password and return a boolean", async () => {


        const userToCheck = new User(mockUser)
        await userToCheck.save().then(
           ()=>{
                expect(userToCheck.email).toBe('mock@gamil.com')
           }
        );

    });


});
