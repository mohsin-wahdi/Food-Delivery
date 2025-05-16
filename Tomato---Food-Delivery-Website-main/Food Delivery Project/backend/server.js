import express from "express"; // Importing the express framework for building the server
import cors from "cors"; // Importing the CORS middleware to enable Cross-Origin Resource Sharing
import { connectDB } from "./config/db.js"; // Importing the database connection function
import foodRouter from "./routes/foodRoute.js"; // Importing routes for food-related API endpoints
import userRouter from "./routes/userRoute.js"; // Importing routes for user-related API endpoints
import "dotenv/config"; // Automatically loads environment variables from a `.env` file into `process.env`
import cartRouter from "./routes/cartRoute.js"; // Importing routes for cart-related API endpoints
import orderRouter from "./routes/orderRoute.js"; // Importing routes for order-related API endpoints

// Application configuration
const app = express(); // Create an Express app
const port = 4000; // Set the port number for the server

// Middleware configuration
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Middleware to enable CORS (Cross-Origin Resource Sharing)

// Database connection
connectDB(); // Connect to MongoDB using the `connectDB` function

// API routes and static file serving
app.use("/api/food", foodRouter); // Route for handling food-related API requests
app.use("/images", express.static("uploads")); // Serve static files (images) from the 'uploads' directory
app.use("/api/user", userRouter); // Route for handling user-related API requests
app.use("/api/cart", cartRouter); // Route for handling cart-related API requests
app.use("/api/order/", orderRouter); // Route for handling order-related API requests

// Root endpoint to check if the API is working
app.get("/", (req, res) => {
    res.send("API WORKING"); // Send a simple response when accessing the root URL
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`); // Log the server URL once it starts
});

/* MongoDB connection string example (replace placeholders):
   mongodb+srv://<db_username>:<db_password>@cluster0.as43i97.mongodb.net/?
   
   Make sure to replace <db_username> and <db_password> with your actual MongoDB credentials.
   The connection string will be used in the `connectDB` function (typically in the `config/db.js` file).
*/
