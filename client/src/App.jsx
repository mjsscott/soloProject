import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PetListPage from "./pages/PetListPage";
import PetDetailPage from "./pages/PetDetailPage";
import HomePage from "./pages/HomePage";
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from "./components/Footer"
import "./App.css"
import AdminEditPage from "./pages/AdminEditPage"
import FavoritePetsPage  from "./pages/FavsPetPage"


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pets" element={<PetListPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/favorite" element={<FavoritePetsPage />} /> 
       {/* the star means the following or nested paths */}
          <Route path="/dashboard/*" element={<AdminDashboard />} /> 
          <Route path="/pets/:id/edit" element={<AdminEditPage />} /> 
          
          {/* Add other routes here */}
        </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
