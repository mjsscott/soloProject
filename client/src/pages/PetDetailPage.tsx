import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/PetDetailPage.css";
import { FaPhone, FaEdit, FaHeart } from "react-icons/fa";
import { BiSolidHomeHeart } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdDelete } from "react-icons/md";
import { Pet } from "../../types/Pet";



const PetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [cityName, setCityName] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get<Pet>(
          `http://localhost:3000/pets/${id}`
        );
        const fetchedPet = response.data;
        setPet(fetchedPet);

        const { lat, lng } = fetchedPet.location;
        if (lat && lng) {
          const geocodeResponse = await axios.get<{
            address: { city?: string };
          }>("https://nominatim.openstreetmap.org/reverse", {
            params: {
              lat,
              lon: lng,
              format: "json",
            },
          });
          setCityName(
            geocodeResponse.data.address.city || "Location not available"
          );
        }
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPet();
  }, [id]);

  const handleFavoriteToggle = async () => {
    try {
      const response = await axios.post<{ pet: { favorite: boolean } }>(
        `http://localhost:3000/favorite/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsFavorite(response.data.pet.favorite);
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  if (!pet) return <p>Loading...</p>;

  return <div className="pet-details">{/* JSX as in the original code */}</div>;
};

export default PetDetailPage;
