
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]); // Store authors
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch authors when component mounts
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:5174/api/author"); // Adjust API endpoint as needed
        setAuthors(response.data); // Assuming response data is an array of { author_id, author_name }
      } catch (err) {
        console.error("Error fetching authors:", err);
      }
    };

    fetchAuthors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5174/api/books", {
        book_name: bookName,
        genre: genre,
        author_id: authorId,
      });

      if (response.status === 201) {
        navigate("/books");
      }
    } catch (err) {
      setError("Error adding book. Please try again.");
      console.error("Error adding book:", err);
    }
  };

  return (
    <div className="add-book-page">
      <h1>Add a New Book</h1>

      <form onSubmit={handleSubmit} className="add-book-form">
        <div>
          <label>Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.author_id} value={author.author_id}>
                {author.author_name} (ID: {author.author_id})
              </option>
            ))}
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;

