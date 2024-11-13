## PetAdopt 

PetAdopt is a web application that connects shelters with potential adopters, allowing users to browse and adopt pets. Shelters can manage pet listings and view messages from potential adopters, while users can add pets to their favorites, filter pets by location, and contact shelters.


# key features:
	•	Browse pets available for adoption
	•	Add and remove favorites
	•	Admin dashboard for pet management
	•	Filter pets by type, location, and age
	•	Contact shelters directly from pet listings

# Install dependencies:

server:
npm install express mongoose cors dotenv

client:
npm install axios 


# Stack
	Backend: Node.js, Express.js
	•	Database: MongoDB
	•	Other: Axios, Cloudinary API for image uploads, Leaflet for maps

# Environment Variables

	•	MONGODB_URI - MongoDB connection string
	•	JWT_SECRET - Secret key for JWT authentication
	•	CLOUDINARY_URL - Cloudinary API URL for image uploads (not in .env in this project)
