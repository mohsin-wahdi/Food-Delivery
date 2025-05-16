import mongoose from "mongoose"; // Import the mongoose library to interact with MongoDB
import "dotenv/config"; // Import dotenv to load environment variables from a .env file

// Function to connect to MongoDB using mongoose
export const connectDB = async () => {
    // Use mongoose to connect to the MongoDB database
    await mongoose
        .connect(
            // Construct the MongoDB connection string using environment variables for username and password
            `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.as43i97.mongodb.net/food-del`
        )
        // If the connection is successful, log "DB Connected" to the console
        .then(() => {
            console.log("DB Connected");
        })
        // Optional: Add a .catch() to handle any connection errors (commented out for simplicity)
        .catch((error) => {
            console.error("DB Connection Failed:", error); // Log the error if the connection fails
        });
};
