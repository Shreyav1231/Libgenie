// src/pages/Books.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Books.css"; // You can style it like the Authors page
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); 

  const handleAddBookClick = () => {
    navigate("/add-book"); 
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5174/api/books");
        console.log("Fetched books:", res.data);
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err.response || err.message || err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="books-page">
      <h1 className="title">Welcome to <span>LibGenie</span> 📚</h1>
      <p className="subtitle">Explore the available books and manage them.</p>

      <div className="book-container">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <div key={book.book_id} className="book-card">
              <h3>Book ID: {book.book_id}</h3>
              <p><strong>Book Name:</strong> {book.book_name}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Author ID:</strong> {book.author_id}</p>
            </div>
          ))
        ) : (
          <p className="no-books">No books available at the moment.</p>
        )}
      </div>

      <button onClick={handleAddBookClick}>Add New Book</button>
      <button><Link to="/">Home</Link></button>
      
    </div>
  );
};

export default Books;
