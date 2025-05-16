import userModel from "../models/userModel.js"; // Import the user model for database operations
import jwt from "jsonwebtoken"; // Import jsonwebtoken for creating tokens
import bcrypt from "bcryptjs/dist/bcrypt.js"; // Import bcrypt for password hashing
import validator from "validator"; // Import validator for input validation

// Function to log in a user
const loginUser = async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from request body
    try {
        // Find user by email in the database
        const user = await userModel.findOne({ email });

        // If user does not exist, respond with an error message
        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist",
            });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // If password does not match, respond with an error message
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        // Create a JWT token for the authenticated user
        const token = createToken(user._id);

        // Respond with success and the generated token
        res.json({ success: true, token });
    } catch (error) {
        console.log(error); // Log any error that occurs
        res.json({ success: false, message: error }); // Respond with a generic error message
    }
};

// Function to create a JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); // Sign the token with the user ID and secret
};

// Function to register a new user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body; // Destructure name, email, and password from request body
    try {
        // Check if a user with the same email already exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate the email format and ensure the password is strong
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email",
            });
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password",
            });
        }

        // Hash the user's password before saving to the database
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

        // Create a new user document
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const user = await newUser.save();

        // Create a JWT token for the newly registered user
        const token = createToken(user._id);

        // Respond with success and the generated token
        res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.log(error); // Log any error that occurs
        res.json({ success: false, message: "This is an error" }); // Respond with a generic error message
    }
};

// Export the login and registration functions for use in routes
export { loginUser, registerUser };
