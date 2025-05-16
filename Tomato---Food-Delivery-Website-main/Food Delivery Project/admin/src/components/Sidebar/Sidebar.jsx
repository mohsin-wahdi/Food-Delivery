import React from "react"; // Import React
import "./Sidebar.css"; // Import CSS for styling
import { assets } from "../../assets/assets"; // Import asset images
import { NavLink } from "react-router-dom"; // Import NavLink for navigation

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                {/* Navigation link to add items */}
                <NavLink to="/add" className="sidebar-option">
                    <img src={assets.add_icon} alt="Add items" />{" "}
                    {/* Image for adding items */}
                    <p>Add items</p>
                </NavLink>

                {/* Navigation link to list items */}
                <NavLink to="/list" className="sidebar-option">
                    <img src={assets.order_icon} alt="List items" />{" "}
                    {/* Image for listing items */}
                    <p>List Items</p>
                </NavLink>

                {/* Navigation link to view orders */}
                <NavLink to="/orders" className="sidebar-option">
                    <img src={assets.order_icon} alt="View orders" />{" "}
                    {/* Image for viewing orders */}
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar; // Export Sidebar component for use in other parts of the application
