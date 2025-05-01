// Report.jsx
import React, { useState } from "react";
import axios from "axios";

export default function Report() {
  const [start, setStart] = useState("");
  const [end, setEnd]     = useState("");
  const [rows, setRows]   = useState([]);
  const [best, setBest]   = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:5174/api/report", {
        params: { start, end }
      });
      setRows(data.details);
      setBest(data.bestseller);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not generate report.");
    }
  };

  return (
    <div>
      <h1>Outstanding Loans Report</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:  
          <input type="date" value={start} onChange={e=>setStart(e.target.value)} required/>
        </label>
        <label>
          End Date:    
          <input type="date" value={end}   onChange={e=>setEnd(e.target.value)}   required/>
        </label>
        <button type="submit">Run</button>
      </form>

      {error && <p style={{color:"red"}}>{error}</p>}

      {rows.length > 0 && (
        <>
          <h2>Loans</h2>
          <table>
            <thead>
              <tr>
                <th>Book</th><th>Borrower</th><th>Days Out</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.loan_id}>
                  <td>{r.book_name}</td>
                  <td>{r.borrower_name}</td>
                  <td>{r.days_with}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {best && (
        <div>
          <h2>Bestseller Author</h2>
          <p>
            {best.author_name} — {best.borrow_count} outstanding loans
          </p>
        </div>
      )}
    </div>
  );
}
