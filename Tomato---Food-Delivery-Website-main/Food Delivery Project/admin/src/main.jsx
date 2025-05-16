import { createRoot } from "react-dom/client"; // Importing createRoot from ReactDOM for rendering the application
import App from "./App.jsx"; // Importing the main App component
import "./index.css"; // Importing global CSS styles for the application
import { BrowserRouter } from "react-router-dom"; // Importing BrowserRouter for routing capabilities

// Creating a root for the React application and rendering the App component within a BrowserRouter
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        {" "}
        {/* Wrapping the App in BrowserRouter to enable routing */}
        <App /> {/* Rendering the main App component */}
    </BrowserRouter>
);
