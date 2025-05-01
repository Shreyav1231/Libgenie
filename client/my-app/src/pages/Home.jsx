
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom"; 
import Author from "./Author";

const Home = () => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllLoans = async () => {
      try {
        const res = await axios.get("http://localhost:5174/home");
        console.log("Fetched loans:", res.data);
        
        // If no loans are returned, set loans as an empty array
        if (res.data.length === 0) {
          setLoans([]);
        } else {
          setLoans(res.data);
        }
      } catch (err) {
        console.error("Error fetching loans:", err.response ? err.response.data : err.message);
        setError("There was an error fetching the loan data.");
      }
    };
    fetchAllLoans();
  }, []);

  return (
    <div className="homepage">
      <h1 className="title">Welcome to <span>LibGenie</span> 📚</h1>
      <p className="subtitle">Manage book loans efficiently and track borrowers easily.</p>
      
      <div className="loan-container">
        {error && <p className="error-message">{error}</p>}
        
        {Array.isArray(loans) && loans.length > 0 ? (
          loans.map((loanItem) => (
            <div key={loanItem.loan_id} className="loan-card">
              <h3>Loan ID: {loanItem.loan_id}</h3>
              <p><strong>Book ID:</strong> {loanItem.book_id}</p>
              <p><strong>Borrower ID:</strong> {loanItem.borrower_id}</p>
              <p><strong>Borrow Date:</strong> {new Date(loanItem.borrow_date).toLocaleDateString()}</p>
              <p><strong>Return Date:</strong> {loanItem.return_date ? new Date(loanItem.return_date).toLocaleDateString() : "Not Returned"}</p>
            </div>
          ))
        ) : (
          <p className="no-loans">No active loans at the moment.</p>
        )}
      </div>
      <Link to="/author"><button>View Authors</button></Link>
      <Link to="/books"><button>View Books</button></Link>
      <Link to="/report"><button>Generate Report</button></Link>
     </div>
  );
};

export default Home;
