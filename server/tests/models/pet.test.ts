import mongoose from "mongoose";
import petModel from "../../models/pet";
import { PetType } from "../../@types/PetType";
import { mockPets } from "./mockPets";
require('dotenv').config();

describe("Pet Model Tests", () => {
    beforeAll(async () => {
        // Connect to an in-memory MongoDB instance or your test DB before tests run
        await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
        // Disconnect from the database after tests are complete
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("should create a new pet without specifying _id", async () => {
        const petData = mockPets[1];

        const pet = new petModel(petData);
        await pet.save();


        expect(pet._id).toBeDefined();
        expect(pet.name).toBe("Rex");
        expect(pet.type).toBe("Dog");
        expect(pet.breed).toBe("Bulldog");
        expect(pet.age).toBe(3);
        expect(pet.gender).toBe("Male");
        expect(pet.city).toBe("New York");
        expect(pet.favorite).toBe(false);
        expect(pet.available).toBe(true);


        expect(pet.createdAt).toBeDefined();
        expect(pet.updatedAt).toBeDefined();
        expect(new Date(pet.createdAt)).toBeInstanceOf(Date);
        expect(new Date(pet.updatedAt)).toBeInstanceOf(Date);
    });

    it("should enforce required fields", async () => {

        const invalidPet = new petModel({
            type: "Cat",
        });

        let error;
        try {
            await invalidPet.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();

    });

    it("should set default values for 'favorite' and 'available'", async () => {
        const petData = {
            name: "Fluffy",
            type: "Cat",
        };

        const pet = new petModel(petData);
        await pet.save();

        expect(pet.favorite).toBe(false);
        expect(pet.available).toBe(true);
    });

    it("should correctly update a pet", async () => {

        const pet = new petModel({
            name: "Bella",
            type: "Dog",
        });
        await pet.save();


        pet.city = "Los Angeles";
        await pet.save();

        const updatedPet: PetType | null = await petModel.findById(pet._id);

    });
});
