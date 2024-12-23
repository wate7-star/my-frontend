import React from "react"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ClipLoader } from "react-spinners";  // Import spinner


const Sell = () => {
  const [form, setForm] = useState({ name: "",price:'',location:'',phoneNumber:'', description: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);  // Track loading state
  const navigate = useNavigate();  // Hook to redirect after upload

  const postItem = async () => {
    setLoading(true);  // Set loading to true when starting the upload
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("location", form.location);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("description", form.description);
      if (image) formData.append("image", image);  // Append image file

      const response = await axios.post("/api/items", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 90000,
      });

      // After the item is posted, redirect to the display page
      setLoading(false);  // Set loading to false after upload
      navigate("/");  // Redirect to the page that displays items
    } catch (error) {
      setLoading(false);  // Ensure loading is set to false in case of an error
      console.error("Error posting item:", error.response || error);
    }
  };

  return (
    <div className="center-container">
      <div>
      <h1>Post Item</h1>

     

      {/* Form to post a new item */}
      <div className="post-items">
        <input
          type="text"
          placeholder="Name of Item"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <br />
        <input
          type="number"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        />
        <br />
        
        <textarea 
          type="text"
          placeholder="Describe the Item,Quality,version etc"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <br />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])} // Save the selected file
        />
        <br />
        {/* Disable the upload button if loading is true */}
        <button onClick={postItem} disabled={loading}>
          {loading ? "Uploading..." : "Add Item"}
        </button>
        {loading && (
  <div>
    <ClipLoader size={50} color="#36D7B7" loading={loading} />
  </div>
)}
      </div>
    </div>

    </div>
    
  );
};

export default Sell;

 