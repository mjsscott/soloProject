import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PetCard from "../components/PetCard";
import "../styles/AdminPetList.css";
import { Pet } from "../../types/Pet";
import { randomUUID } from "crypto";

// added blank pet for setting state w/types.
const blankPet = {
  _id: randomUUID(),
  breed: '',
  favorite: false,
  name: "",
  type: "",
  gender: "",
  shelterName: "",
  phone: "",
  email: "",
  age: 0,
  location: {
    lat: 0,
    lng: 0,
  },
  image: "",
  city: '',
  description: '',
  available: true
}

const AdminPetList = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPet, setNewPet] = useState<Pet>(blankPet);
  const [imageFile, setImageFile] = useState<File>();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  interface File {
    lastModified: number;
    name: string;
    size: number;
    type: string;
    arrayBuffer (): Promise<ArrayBuffer>;

  }

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/dashboard/pets",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  const handleAddPetClick = () => {
    setShowAddForm(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name && value) {

      setNewPet({ ...newPet, [name]: value});
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setImageFile(files[0]);
    }
  };


  const geocodeCity = async (cityName: string) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: cityName,
            format: "json",
            limit: 1,
          },
        }
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
      return { lat: 0, lng: 0 };
    }
  };

  const handleAddPetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("file", imageFile.toString());
      }
      formData.append("upload_preset", "petAdopt");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/hadil/image/upload",
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      // Geocode the city to get latitude and longitude
      const { lat, lng } = await geocodeCity(newPet.location.toString());
      const newPetData = { ...newPet, location: { lat, lng }, image: imageUrl };

      const response = await axios.post(
        "http://localhost:3000/pets",
        newPetData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPets([...pets, response.data]);
      setShowAddForm(false);

      setNewPet(blankPet);
      setImageFile(new File([], ''));
    } catch (error) {
      console.error("Error uploading pet:", error);
    }
  };

  return (
    <div className="Adminpet-list-page">
      {userRole === "shelter" && (
        <button onClick={handleAddPetClick}>New Pet</button>
      )}

      {showAddForm && (
        <form onSubmit={handleAddPetSubmit} className="add-pet-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newPet.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type (e.g., Dog, Cat)"
            value={newPet.type}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={newPet.gender}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="shelterName"
            placeholder="Shelter"
            value={newPet.shelterName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Contact Number"
            value={newPet.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newPet.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newPet.age}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="City Name"
            value={newPet.city}
            onChange={handleInputChange}
            required
          />
          <input type="file" name="image" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
      )}

      <div className="pet-list">
        {pets.map((pet) => (
          <div key={pet._id}>
            <PetCard key={pet._id} pet={pet} />
            <Link to={`/pets/${pet._id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPetList;
