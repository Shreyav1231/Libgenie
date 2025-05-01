import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Author.css'


const Author = () => {
  const [author, setAuthor] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5174/author/${id}`);
      
      const res = await axios.get("http://localhost:5174/author");
      setAuthor(res.data);
    } catch (err) {
      console.error("Error deleting author:", err);
    }
  };
  

  useEffect(() => {
    const fetchAllAuthor = async () => {
      try {
        const res = await axios.get("http://localhost:5174/api/author");
        console.log(res.data); // Log the response data
        setAuthor(res.data);
      } catch (err) {
        console.error("Error fetching authors:", err.response || err.message || err);
      }
    };
    fetchAllAuthor();
  }, []);


  return (
    <div>
      <h1>Author List</h1>
      <ul>
        {Array.isArray(author) && author.length > 0 ? (
          author.map((authorItem) => (
            <li key={authorItem.author_id}>
              <strong>{authorItem.author_name}</strong> - Age: {authorItem.age}
              <button className="delete-button" onClick={() => handleDelete(authorItem.author_id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No authors available.</p> 
        )}
      </ul>
      <button><Link to="/add">Add new author</Link></button>
      <button><Link to="/edit/1">Edit</Link></button>
      <button><Link to="/">Home</Link></button>
    </div>
  );
};

export default Author;
