const Pet = require("../models/Pet");

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new pet (for shelters)
exports.addPet = async (req, res) => {
  try {
    const newPet = new Pet({
      ...req.body,
      shelter: req.user.id, // Assuming shelter is logged in
    });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get one Pet for details
exports.getOnePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pet details" });
  }
};
