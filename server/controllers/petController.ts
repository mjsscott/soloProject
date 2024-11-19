import petModel from "../models/pet-model";
import { Request, Response } from "express";
import { PetType } from "../@types/PetType";

// Get all pets
export async function getAllPets (req: Request, res: Response): Promise<void> {
  try {
    const pets: PetType[] = await petModel.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Add a new pet (for shelters)
export async function addPet (req: Request, res: Response): Promise<void> {
  try {
    const thisShelter = req.user?.id;
    const newPet = new petModel({
      ...req.body,
      shelter: thisShelter // Assuming shelter is logged in
    });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//Get one Pet for details
export async function getOnePet (req: Request, res: Response): Promise<void> {
  try {
    const pet: PetType = await petModel.findById(req.params.id);
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pet details" });
  }
};
