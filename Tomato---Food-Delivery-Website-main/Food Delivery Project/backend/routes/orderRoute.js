import express from "express"; // Importing the Express framework for routing
import authMiddleware from "../middleware/auth.js"; // Importing the authentication middleware
import { placeOrder } from "../controllers/orderController.js"; // Importing the placeOrder controller function

// Creating a new router instance for handling order-related routes
const orderRouter = express.Router();

// Route to place an order
// The authMiddleware checks if the user is authenticated before allowing them to place an order
orderRouter.post("/place", authMiddleware, placeOrder);

// Exporting the order router for use in other parts of the application
export default orderRouter;
