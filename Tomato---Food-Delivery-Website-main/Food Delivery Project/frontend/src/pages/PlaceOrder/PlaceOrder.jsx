import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
    // Accessing values and functions from the global StoreContext
    const { getTotalCartAmount, token, food_list, cartItems, url } =
        useContext(StoreContext);

    // Local state for storing user's delivery information
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    /**
     * Handles form input changes and updates the corresponding state.
     * @param {Event} event - The input change event.
     */
    const onChangeHandler = (event) => {
        const name = event.target.name; // Get the input name (e.g., firstName, lastName)
        const value = event.target.value; // Get the input value
        setData((data) => ({ ...data, [name]: value })); // Update the corresponding field in state
    };

    /**
     * Handles the process of placing the order when the form is submitted.
     * It gathers cart items, constructs order data, and sends a request to place the order.
     * @param {Event} event - The form submission event.
     */
    const placeOrder = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        let orderItems = [];

        // Build the orderItems array by iterating through cartItems and adding quantities
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item }; // Create a shallow copy of the item object
                itemInfo.quantity = cartItems[item._id]; // Add quantity from cartItems
                orderItems.push(itemInfo); // Add the item to the orderItems array
            }
        });

        // Prepare the full order data with address and total amount
        let orderData = {
            address: data, // Delivery information provided by the user
            items: orderItems, // List of items in the order with their quantities
            amount: getTotalCartAmount() + 200, // Total amount including additional fees
        };

        try {
            // Send a POST request to the backend to place the order
            let response = await axios.post(
                url + "/api/order/place",
                orderData,
                {
                    headers: { token }, // Include the user's authentication token
                }
            );

            // Handle the successful response from the backend
            if (response.data.success) {
                const { session_url } = response.data; // Extract session URL from response
                window.location.replace(session_url); // Redirect user to Stripe checkout page
            } else {
                alert("Error placing order. Please try again."); // Display error if order failed
            }
        } catch (error) {
            console.error("Error placing order:", error); // Log error to the console
            alert(
                "An error occurred while placing the order. Please try again."
            ); // Notify the user of an error
        }
    };

    return (
        <form className="place-order" onSubmit={placeOrder}>
            {/* Left section: Delivery information */}
            <div className="place-order-left">
                <p className="title">Delivery Information</p>

                {/* Input fields for first name and last name */}
                <div className="multi-fields">
                    <input
                        required
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        required
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type="text"
                        placeholder="Last Name"
                    />
                </div>

                {/* Input field for email */}
                <input
                    required
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email Address"
                />

                {/* Input field for street */}
                <input
                    required
                    name="street"
                    onChange={onChangeHandler}
                    value={data.street}
                    type="text"
                    placeholder="Street"
                />

                {/* Input fields for city and state */}
                <div className="multi-fields">
                    <input
                        required
                        name="city"
                        onChange={onChangeHandler}
                        value={data.city}
                        type="text"
                        placeholder="City"
                    />
                    <input
                        required
                        name="state"
                        onChange={onChangeHandler}
                        value={data.state}
                        type="text"
                        placeholder="State"
                    />
                </div>

                {/* Input fields for zip code and country */}
                <div className="multi-fields">
                    <input
                        required
                        name="zipcode"
                        onChange={onChangeHandler}
                        value={data.zipcode}
                        type="text"
                        placeholder="Zip Code"
                    />
                    <input
                        required
                        name="country"
                        onChange={onChangeHandler}
                        value={data.country}
                        type="text"
                        placeholder="Country"
                    />
                </div>

                {/* Input field for phone */}
                <input
                    required
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="text"
                    placeholder="Phone"
                />
            </div>

            {/* Right section: Cart totals and order submission */}
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>

                    {/* Subtotal display */}
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />

                        {/* Delivery fee display */}
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />

                        {/* Total amount display */}
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>
                                $
                                {getTotalCartAmount() === 0
                                    ? 0
                                    : getTotalCartAmount() + 2}
                            </b>
                        </div>
                    </div>
                    {/* Button to proceed to payment */}
                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
