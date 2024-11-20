import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminEditPage.css";
import { blankPet } from "../../types/BlankPet";

interface File {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  arrayBuffer (): Promise<ArrayBuffer>;

}

const AdminEditPage = () => {
  const { id } = useParams(); // Ensure `id` is obtained correctly
  const [pet, setPet] = useState(blankPet);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File>();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (!id) return; // Prevent API call if `id` is undefined

    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/pets/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPet();
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPet({ ...pet, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setImageFile(files[0]);
    }
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const updatedPet = { ...pet };

      if (imageFile) {
        // Upload image file here and get the URL
        const formData = new FormData();
        formData.append("file", imageFile.toString());
        formData.append("upload_preset", "petAdopt");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/hadil/image/upload",
          formData
        );

        updatedPet.image = uploadResponse.data.secure_url; // Update with new image URL
      }

      await axios.put(
        `http://localhost:3000/dashboard/pets/${id}`,
        updatedPet,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate(`/pets/${id}`); // Redirect back to details page after update
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return (
    <div className="edit-page-container">
      {userRole === "shelter" && (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            name="name"
            value={pet.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={pet.age}
            onChange={handleInputChange}
            required
          />

          <input type="file" name="image" onChange={handleFileChange} />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AdminEditPage;
