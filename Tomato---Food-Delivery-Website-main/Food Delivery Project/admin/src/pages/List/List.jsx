import React, { useEffect, useState } from "react"; // Import necessary hooks from React
import "./List.css"; // Import CSS for styling
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-toastify"; // Import toast for notifications

const List = ({ url }) => {
    const [list, setList] = useState([]); // State to store the list of food items

    // Function to fetch the list of food items
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`); // Make GET request to fetch the food list
            console.log(response.data); // Log the response for debugging
            if (response.data.success) {
                setList(response.data.data); // Update the state with the fetched data
            } else {
                toast.error("Error fetching food list."); // Show error message if fetch was unsuccessful
            }
        } catch (error) {
            toast.error("An error occurred while fetching the food list."); // Handle network or other errors
        }
    };

    useEffect(() => {
        fetchList(); // Fetch the list of food items when the component mounts
    }, []);

    // Function to remove a food item
    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, {
                id: foodId,
            }); // Send POST request to remove food item
            if (response.data.success) {
                toast.success(response.data.message); // Show success message
                await fetchList(); // Refresh the list after deletion
            } else {
                toast.error("Error removing food item."); // Show error message if removal was unsuccessful
            }
        } catch (error) {
            toast.error("An error occurred while removing the food item."); // Handle network or other errors
        }
    };

    return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={item._id} className="list-table-format">
                        {" "}
                        {/* Use item's ID as the key for better performance */}
                        <img
                            src={`${url}/images/${item.image}`}
                            alt={item.name}
                        />{" "}
                        {/* Display the food image */}
                        <p>{item.name}</p> {/* Display the food name */}
                        <p>{item.category}</p> {/* Display the food category */}
                        <p>{item.price}</p> {/* Display the food price */}
                        <p
                            className="cursor"
                            onClick={() => removeFood(item._id)} // Call removeFood on click
                        >
                            x {/* Display a delete icon */}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List; // Export List component for use in other parts of the application
