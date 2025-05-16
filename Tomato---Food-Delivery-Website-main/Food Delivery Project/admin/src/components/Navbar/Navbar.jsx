import React from "react"; // Import React
import "./Navbar.css"; // Import CSS for styling
import { assets } from "../../assets/assets.js"; // Import asset images

const Navbar = () => {
    return (
        <div className="navbar">
            {/* Logo displayed in the navbar */}
            <img className="logo" src={assets.logo} alt="Logo" />

            {/* User profile image displayed in the navbar */}
            <img className="profile" src={assets.profile_image} alt="Profile" />
        </div>
    );
};

export default Navbar; // Export Navbar component for use in other parts of the application
