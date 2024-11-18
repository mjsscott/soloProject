import '../styles/Navbar.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
   // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    /* useEffect(() => {
        // Check token to determine login state whenever component renders
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update login state based on token presence
    }, [isLoggedIn]); // Depend on isLoggedIn to re-run when it changes
 */

    /*  useEffect(() => {
        // Listen for changes to localStorage (e.g., token changes)
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); */

   /*  const handleLogin = () => {
        setIsLoggedIn(true);
    }; */




    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token on logout
        //setIsLoggedIn(false); // Update login state

        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="navbar">
            <h3><Link to="/">PetAdopt</Link></h3>
            <div className="nav-links">
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;