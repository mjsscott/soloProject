import { Response, Request } from "express";
import {  PetType } from "../@types/PetType";
import petModel from "../models/pet";

// Toggle favorite status of a pet
export async function toggleFavoriteStatus (req: Request, res: Response): Promise<void> {
  const { id: petId } = req.params;

  try {
    const pet = await petModel.findById(petId);

    if (!pet) {res.status(404).json({ error: "Pet not found" });
    return;}

    pet.favorite = !pet.favorite; // Toggle favorite status
    await pet.save();

    res
      .status(200)
      .json({ message: `Favorite status updated to ${pet.favorite}`, pet });
  } catch (error) {
    console.error("Error toggling favorite status:", error);
    res.status(500).json({ error: "Failed to toggle favorite status" });
  }
};

// Get user's favorite pets
export async function getAllFavorites (req: Request, res: Response): Promise<void> {
  try {
    const favoritePets = await petModel.find({ favorite: true });
    res.status(200).json(favoritePets);
  } catch (error) {
    console.error("Error fetching favorite pets:", error);
    res.status(500).json({ error: "Failed to fetch favorite pets" });
  }
};
