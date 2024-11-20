import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PetCard from "../components/PetCard";
import "../styles/FavsPetPage.css";
import { Pet } from "../../types/Pet";
interface FavsPetPageProps {

}

const FavoritePetsPage: React.FC<FavsPetPageProps> = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:3000/favorite", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorite pets:", error);
      }
    };

    fetchFavorites();
  }, [token]);

  return (
    <div className="favorite-list">
      <h2 id="title">Favorite Pets</h2>
      <div data-testid='petlist' className="pet-list">
        {favorites.length > 0 ? favorites.map((pet: Pet) => (
          <div key={pet._id}>
            <PetCard key={pet._id} pet={pet} />
            <Link to={`/pets/${pet._id}`}></Link>
          </div>
        )) : `It looks like you don't have any favorites yet!`}
      </div>
    </div>
  );
};

export default FavoritePetsPage;
