import mongoose from "mongoose";
import petModel from "../../models/pet-model";
import { PetType } from "../../@types/PetType";

describe("Pet Model Tests", () => {
    beforeAll(async () => {
        // Connect to an in-memory MongoDB instance or your test DB before tests run
        await mongoose.connect("mongodb://localhost/test_db");
    });

    afterAll(async () => {
        // Disconnect from the database after tests are complete
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("should create a new pet without specifying _id", async () => {
        const petData = {
            name: "Rex",
            type: "Dog",
            breed: "Bulldog",
            age: 3,
            gender: "Male",
            city: "New York",
        };

        const pet = new petModel(petData);
        await pet.save();

        // Test if the pet is saved and if the _id is automatically created
        expect(pet._id).toBeDefined();
        expect(pet.name).toBe("Rex");
        expect(pet.type).toBe("Dog");
        expect(pet.breed).toBe("Bulldog");
        expect(pet.age).toBe(3);
        expect(pet.gender).toBe("Male");
        expect(pet.city).toBe("New York");
        expect(pet.favorite).toBe(false); // default value
        expect(pet.available).toBe(true); // default value

        // Verify timestamps are created
        expect(pet.createdAt).toBeDefined();
        expect(pet.updatedAt).toBeDefined();
        expect(new Date(pet.createdAt)).toBeInstanceOf(Date);
        expect(new Date(pet.updatedAt)).toBeInstanceOf(Date);
    });

    it("should enforce required fields", async () => {
        // Create a pet without the required fields to test validation
        const invalidPet = new petModel({
            type: "Cat", // Missing 'name' which is required
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

        expect(pet.favorite).toBe(false); // default value
        expect(pet.available).toBe(true);  // default value
    });

    it("should correctly update a pet", async () => {
        // Create and save a new pet
        const pet = new petModel({
            name: "Bella",
            type: "Dog",
        });
        await pet.save();

        // Update pet's city and check the result
        pet.city = "Los Angeles";
        await pet.save();

        const updatedPet: PetType | null = await petModel.findById(pet._id);
        expect(updatedPet.city).toBe("Los Angeles");
    });
});
