import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import NotFound from "./pages/NotFound"; // Importing NotFound component for handling 404 errors
import { ToastContainer } from "react-toastify"; // Toast notifications for user feedback
import "react-toastify/dist/ReactToastify.css"; // Importing toast styles

const App = () => {
    const url = "http://localhost:4000"; // Base URL for API calls

    return (
        <div className="app">
            <ToastContainer /> {/* Container for toast notifications */}
            <Navbar /> {/* Rendering the navigation bar */}
            <hr /> {/* Horizontal line for separation */}
            <div className="app-content">
                <Sidebar /> {/* Rendering the sidebar for navigation */}
                <div className="routes">
                    {" "}
                    {/* Wrapper for route components */}
                    <Routes>
                        <Route path="/add" element={<Add url={url} />} />{" "}
                        {/* Route for adding items */}
                        <Route path="/list" element={<List url={url} />} />{" "}
                        {/* Route for listing items */}
                        <Route
                            path="/orders"
                            element={<Orders url={url} />}
                        />{" "}
                        {/* Route for viewing orders */}
                        <Route path="*" element={<NotFound />} />{" "}
                        {/* Fallback route for unmatched paths */}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
