import orderModel from "../models/orderModel.js"; // Importing the order model
import userModel from "../models/userModel.js"; // Importing the user model
import Stripe from "stripe"; // Importing the Stripe library for payment handling
import "dotenv/config";

// Initializing Stripe with the secret key from the environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to place an order, triggered by a request from the frontend
const placeOrder = async (req, res) => {
    // Frontend URL for redirect after payment success/failure
    const frontend_url = "http://localhost:5173"; // Change this to your deployed frontend URL in production

    try {
        // 1. Creating a new order object with data from the request body
        const newOrder = new orderModel({
            userId: req.body.userId, // User ID from the request body
            items: req.body.items, // List of items to order
            amount: req.body.amount, // Total order amount
            address: req.body.address, // Delivery address for the order
        });

        // 2. Save the new order to the database
        await newOrder.save();

        // 3. Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // 4. Prepare line items for Stripe Checkout
        // Map each item in the order to the format expected by Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd", // Set currency to INR (Indian Rupees)
                product_data: {
                    name: item.name, // Name of the product
                },
                unit_amount: item.price * 100 * 80, // Convert the price to paise (assuming 1 INR = 80 units)
            },
            quantity: item.quantity, // Quantity of the item
        }));

        // 5. Add delivery charges as a separate line item
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges", // Description for the delivery charges
                },
                unit_amount: 2 * 100 * 80, // Fixed delivery charge (example: Rs 2 converted to paise)
                quantity: 1, // Only 1 delivery charge is added per order
            },
        });

        // 6. Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items, // Add the line items to the Stripe session
            mode: "payment", // Payment mode for processing the order
            // Define success and cancel URLs to handle redirection after payment
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Redirect on successful payment
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, // Redirect if the payment fails or is canceled
        });

        // 7. Send the Stripe session URL back to the frontend
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        // Log the error and return a response with an error message
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder };
