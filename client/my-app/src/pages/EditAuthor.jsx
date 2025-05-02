import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditAuthor = () => {
  const navigate = useNavigate();
  
  // State for all authors and the selected author
  const [authors, setAuthors] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState("");
  const [author, setAuthor] = useState({ author_name: "", age: "" });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Fetch all authors on component mount
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5174/api/author");
        setAuthors(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching authors:", err);
        setLoading(false);
        // setNotification({ message: "Failed to load authors", type: "error" });
      }
    };
    
    fetchAuthors();
  }, []);

  // Fetch the selected author's details when selection changes
  useEffect(() => {
    const fetchAuthorDetails = async () => {
      if (!selectedAuthorId) {
        setAuthor({ author_name: "", age: "" });
        return;
      }
      
      try {
        const res = await axios.get(`http://localhost:5174/api/author/${selectedAuthorId}`);
        setAuthor(res.data);
      } catch (err) {
        console.error("Error fetching author details:", err);
        // setNotification({ message: "Failed to fetch author details", type: "error" });
      }
    };
    
    fetchAuthorDetails();
  }, [selectedAuthorId]);

  const handleAuthorSelect = (e) => {
    setSelectedAuthorId(e.target.value);
    // Clear any existing notifications when selecting a new author
    setNotification({ message: "", type: "" });
  };

  const handleChange = (e) => {
    setAuthor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!selectedAuthorId) {
      setNotification({ message: "Please select an author to update", type: "error" });
      return;
    }
    
    try {
      await axios.put(`http://localhost:5174/api/author/${selectedAuthorId}`, author);
      setNotification({ message: "Author updated successfully!", type: "success" });
      
      // Optional: Automatically navigate after short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Error updating author:", err);
      setNotification({ message: "Failed to update author", type: "error" });
    }
  };
  

  return (
    <div className="edit-author-container" style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h1>Edit Author</h1>
      
      {/* Notification display */}
      {notification.message && (
        <div 
          style={{ 
            padding: "10px 15px", 
            marginBottom: "20px", 
            borderRadius: "4px",
            backgroundColor: notification.type === "success" ? "#d4edda" : "#f8d7da",
            color: notification.type === "success" ? "#155724" : "#721c24",
            border: `1px solid ${notification.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
          }}
        >
          {notification.message}
        </div>
      )}
      
      <div className="form-group" style={{ marginBottom: "20px" }}>
        <label htmlFor="authorSelect" style={{ display: "block", marginBottom: "5px" }}>
          Select Author to Edit:
        </label>
        <select
          id="authorSelect"
          value={selectedAuthorId}
          onChange={handleAuthorSelect}
          style={{ 
            width: "100%", 
            padding: "8px", 
            border: "1px solid #ccc", 
            borderRadius: "4px" 
          }}
        >
          <option value="">-- Select an author --</option>
          {authors.map((author) => (
            <option key={author.author_id} value={author.author_id}>
              {author.author_name} (ID: {author.author_id})
            </option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <p>Loading authors...</p>
      ) : selectedAuthorId ? (
        <form onSubmit={handleUpdate}>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label htmlFor="authorName" style={{ display: "block", marginBottom: "5px" }}>
              Author Name:
            </label>
            <input
              id="authorName"
              type="text"
              name="author_name"
              value={author.author_name || ""}
              onChange={handleChange}
              style={{ 
                width: "100%", 
                padding: "8px", 
                border: "1px solid #ccc", 
                borderRadius: "4px" 
              }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label htmlFor="authorAge" style={{ display: "block", marginBottom: "5px" }}>
              Age:
            </label>
            <input
              id="authorAge"
              type="number"
              name="age"
              value={author.age || ""}
              onChange={handleChange}
              style={{ 
                width: "100%", 
                padding: "8px", 
                border: "1px solid #ccc", 
                borderRadius: "4px" 
              }}
            />
          </div>
          
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Update Author
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/home")}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "4px",
              marginLeft: "10px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <p>Please select an author to edit</p>
      )}
    </div>
  );
};

export default EditAuthor;