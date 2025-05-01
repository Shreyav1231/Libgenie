import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Stats from "./pages/Stats"; 
import Author from "./pages/Author"; 
import Add from "./pages/Add"; 
import EditAuthor from "./pages/EditAuthor"; 
import Books from "./pages/Books"; // Import the Books page
import AddBook from "./pages/AddBook"; // Import the Books page
import Report from "./pages/Report";

import "./style.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/author" element={<Author />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditAuthor />} /> {/* Dynamic Route */}
        <Route path="/books" element={<Books />} /> {/* Add route for books */}
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
