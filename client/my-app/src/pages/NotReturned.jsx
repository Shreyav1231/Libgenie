import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NotReturned() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5174/api/not-returned")
      .then((res) => setBooks(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load not-returned books.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Books Not Yet Returned</h2>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p>No outstanding loans.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 12 }}>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Borrow Date</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.book_id}>
                <td>{b.book_id}</td>
                <td>{b.book_name}</td>
                <td>{new Date(b.borrow_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/"><button style={{ marginTop: 20 }}>Back Home</button></Link>
    </div>
  );
}
