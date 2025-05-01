import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const [author, setAuthor] = useState({
    author_name: "",  // use 'author_name' instead of 'name'
    age: "",
    // author_id: ""
  });

  const handleChange = (e) => {
    setAuthor((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  
  const handleClickAuthor = async (e) => {
    e.preventDefault();
  
    const newAuthor = {
      // author_id: author.author_id,  // Ensure this value is included
      author_name: author.author_name,
      age: parseInt(author.age, 10),
    };
  
    console.log("Sending data to backend:", newAuthor);
  
    try {
      const response = await axios.post("http://localhost:5174/author", newAuthor);
      console.log("Response from backend:", response.data);
  
      // After adding the author, fetch the updated list of authors
      // fetchAllAuthors();  // Call your function to fetch authors and update the state
  
      navigate("/author");  // Navigate to the author list page after success
    } catch (err) {
      console.log("Error:", err);
    }
  };
  

  console.log(author);

  return (
    <div className='form'>
      <h1>Add an author</h1>
      <input
        type="text"
        placeholder='Name'
        onChange={handleChange}
        name="author_name"  // use 'author_name' instead of 'name'
        value={author.author_name}
      />
      <input
        type="number"
        placeholder='Age'
        onChange={handleChange}
        name="age"
        value={author.age}
      />
      <button onClick={handleClickAuthor}>Add</button>
    </div>
  );
};

export default Add;
