import { PetType } from "../@types/Pet";
import messageModel from "../models/message";
import petModel from "../models/pet";
import { Response, Request } from "express";


// Fetch all pets (for shelters to manage)
export async function getAllPets (req: Request, res: Response): Promise<void> {
  try {
    const pets = await petModel.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve pets" });
  }
};

// Add a new pet
export async function addPet (req: Request, res: Response): Promise<void> {
  const myPet: PetType = req.body;
  try {
    const newPet = new petModel({
      name: myPet.name,
      type: myPet.type,
      age: myPet.age,
      location: myPet.location,
      image: myPet.image,
      shelterName: myPet.shelterName,
    });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ error: "Failed to add pet" });
  }
};

// Edit an existing pet
export async function editPet (req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const updatedPet = await petModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(400).json({ error: "Failed to update pet" });
  }
};

export async function deletePet (req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const deletedPet = await petModel.findByIdAndDelete(id);
    if (!deletedPet) {
      res.status(404).json({ message: "Pet not found" });
      return;
    }
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete pet" });
  }
};

// Fetch all messages
export async function getAllMessages (req: Request, res: Response): Promise<void> {
  try {
    const messages = await messageModel.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};
