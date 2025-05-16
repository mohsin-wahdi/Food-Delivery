import React, { useState } from "react"; // Import React and useState hook
import "./Add.css"; // Import CSS for styling
import { assets } from "../../assets/assets"; // Import asset images
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-toastify"; // Import toast for notifications

const Add = ({ url }) => {
    // State for storing uploaded image and product data
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    });

    // Handler for updating product data
    const onChangeHandler = (event) => {
        const { name, value } = event.target; // Destructure name and value from event
        setData((prevData) => ({ ...prevData, [name]: value })); // Update the specific field in the data state
    };

    // Handler for form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(); // Create a FormData object to handle file uploads
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData); // Send POST request to add food item
            if (response.data.success) {
                // Reset form data on success
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad",
                });
                setImage(null); // Reset the image state
                toast.success(response.data.message); // Show success notification
            } else {
                toast.error(response.data.message); // Show error notification
            }
        } catch (error) {
            toast.error("An error occurred while adding the item."); // Handle network or other errors
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : assets.upload_area
                            } // Display uploaded image or placeholder
                            alt="Upload Preview"
                        />
                        <input
                            onChange={(e) => setImage(e.target.files[0])} // Set the selected image
                            type="file"
                            id="image"
                            hidden
                            required
                        />
                    </label>
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                        required
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            name="category"
                            value={data.category}
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="$20"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn">
                    ADD
                </button>
            </form>
        </div>
    );
};

export default Add; // Export Add component for use in other parts of the application
