// import express from "express"
// import mysql from "mysql2"
// import cors from "cors"
// import Author from "./models/Author.js"; // Import the ORM model
// import { sequelize } from "./db.js";
// import Loan from "./models/loan.js";
// import { Book } from "./models/Book.js"; // Import the Book model

// sequelize.sync() 
//   .then(() => console.log("Database connected & models synced"))
//   .catch((err) => console.error("Error syncing database:", err));

// const app = express();
// app.use(express.json());
// app.use(cors());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "cs348_project",
// })
 
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err)
//     return
//   }
//   console.log("Connected to MySQL database")
// })

// app.get("/", (req, res) => {
//   res.json("this is the backend");
// })

// app.get("/api/author", (req, res) => {
//   const q = "SELECT * FROM author"
//   db.query(q, (err, data) => {
//     if (err) {
//       console.error("Error querying database:", err)
//       return res.json(err)
//     }
//     return res.json(data)
//   });
// });

// // ORM

// app.post("/api/books", async (req, res) => {
//   const { book_name, genre, author_id } = req.body;

//   try {
//     const newBook = await Book.create({
//       book_name,
//       genre,
//       author_id,
//     });

//     res.status(201).json(newBook);
//   } catch (err) {
//     console.error("Error adding book:", err);
//     res.status(500).json({ error: "Error adding book" });
//   }
// });

// // ORM 

// app.post("/api/author", async (req, res) => {
//   const { author_id, author_name, age } = req.body;

//   try {
//     // Inserting with author_id explicitly if necessary
//     const newAuthor = await Author.create({
//       author_name,
//       age,
//     });

//     console.log("Author created:", newAuthor);  // Log the newly created author

//     res.status(201).json({ message: "Author added successfully", author: newAuthor });
//   } catch (err) {
//     console.error("Error adding author:", err);
//     res.status(500).json({ error: "Error adding author" });
//   }
// });


// // ORM

// app.get("/api/books", async (req, res) => {
//   try {
//     const books = await Book.findAll();
//     if (books.length === 0) {
//       return res.status(404).json({ message: "No books found" });
//     }
//     res.json(books);
//   } catch (err) {
//     console.error("Error retrieving books:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// // prepared statement

// app.get("/api/author/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await db.execute("SELECT * FROM author WHERE author_id = ?", [id]);
    
//     if (rows.length === 0) {
//       return res.status(404).json({ message: "Author not found" });
//     }

//     res.json(rows[0]);
//   } catch (err) {
//     console.error("Error retrieving author:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// // ORM using method from sequelize

// app.get("/home", async (req, res) => {
//   try {
//     const loans = await Loan.findAll({
//       attributes: ['loan_id', 'book_id', 'borrower_id', 'borrow_date', 'return_date']
//     });
    
//     // Check if no loans are found
//     if (loans.length === 0) {
//       return res.status(404).json({ message: "No loans found" });
//     }

//     res.json(loans);
//   } catch (err) {
//     console.error("Error retrieving loans:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// // prepared statements

// app.put("/api/author/:id", (req, res) => {
//   const { id } = req.params;
//   const { author_name, age } = req.body;
//   const q = "UPDATE author SET author_name = ?, age = ? WHERE author_id = ?";

//   db.query(q, [author_name, age, id], (err, data) => {
//     if (err) {
//       console.error("Error updating author:", err);
//       return res.status(500).json(err);
//     }
//     return res.json({ message: "Author updated successfully" });
//   });
// });

// // Prepared statements

// app.delete("/api/author/:id", async (req, res) => {
//   const { id } = req.params;
//   const q = "DELETE FROM author WHERE author_id = ?";

//   try {
//     const [result] = await db.promise().execute(q, [id]);  
//     res.json({ message: "Author deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting author:", err);
//     res.status(500).json(err);
//   }
// });


// app.listen(5174, () => {
//   console.log("conn to backend")
// })














// import express from "express"
// import mysql from "mysql2"
// import cors from "cors"
// import Author from "./models/Author.js"; // Import the ORM model
// import { sequelize } from "./db.js";
// import Loan from "./models/loan.js";
// import { Book } from "./models/Book.js"; // Import the Book model

// // Sync Sequelize models
// sequelize.sync()
//   .then(() => console.log("Database connected & models synced"))
//   .catch((err) => console.error("Error syncing database:", err));

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "cs348_project",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL database");

//   // Create indexes if they don't exist
//   const indexStmts = [
//     `CREATE INDEX IF NOT EXISTS ix_loan_return_borrow_date ON loan (return_date, borrow_date);`,
//     `CREATE INDEX IF NOT EXISTS ix_loan_book_id           ON loan (book_id);`,
//     `CREATE INDEX IF NOT EXISTS ix_loan_borrower_id       ON loan (borrower_id);`,
//     `CREATE INDEX IF NOT EXISTS ix_books_author_id        ON books (author_id);`
//   ];
//   indexStmts.forEach(sql => {
//     db.query(sql, err => {
//       if (err) console.error("Error creating index:", err);
//     });
//   });
// });

// // Health check
// app.get("/", (req, res) => {
//   res.json("this is the backend");
// });

// // CRUD for Author
// app.get("/api/author", (req, res) => {
//   const q = "SELECT * FROM author";
//   db.query(q, (err, data) => {
//     if (err) {
//       console.error("Error querying database:", err);
//       return res.json(err);
//     }
//     return res.json(data);
//   });
// });

// app.post("/api/author", async (req, res) => {
//   const { author_name, age } = req.body;
//   try {
//     const newAuthor = await Author.create({ author_name, age });
//     console.log("Author created:", newAuthor);
//     res.status(201).json({ message: "Author added successfully", author: newAuthor });
//   } catch (err) {
//     console.error("Error adding author:", err);
//     res.status(500).json({ error: "Error adding author" });
//   }
// });

// app.get("/api/author/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await db.execute("SELECT * FROM author WHERE author_id = ?", [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: "Author not found" });
//     }
//     res.json(rows[0]);
//   } catch (err) {
//     console.error("Error retrieving author:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// app.put("/api/author/:id", (req, res) => {
//   const { id } = req.params;
//   const { author_name, age } = req.body;
//   const q = "UPDATE author SET author_name = ?, age = ? WHERE author_id = ?";
//   db.query(q, [author_name, age, id], (err) => {
//     if (err) {
//       console.error("Error updating author:", err);
//       return res.status(500).json(err);
//     }
//     res.json({ message: "Author updated successfully" });
//   });
// });

// app.delete("/api/author/:id", async (req, res) => {
//   const { id } = req.params;
//   const q = "DELETE FROM author WHERE author_id = ?";
//   try {
//     await db.promise().execute(q, [id]);
//     res.json({ message: "Author deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting author:", err);
//     res.status(500).json(err);
//   }
// });

// // CRUD for Book
// app.post("/api/books", async (req, res) => {
//   const { book_name, genre, author_id } = req.body;
//   try {
//     const newBook = await Book.create({ book_name, genre, author_id });
//     res.status(201).json(newBook);
//   } catch (err) {
//     console.error("Error adding book:", err);
//     res.status(500).json({ error: "Error adding book" });
//   }
// });

// app.get("/api/books", async (req, res) => {
//   try {
//     const books = await Book.findAll();
//     if (books.length === 0) {
//       return res.status(404).json({ message: "No books found" });
//     }
//     res.json(books);
//   } catch (err) {
//     console.error("Error retrieving books:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// // List all loans (home)
// app.get("/home", async (req, res) => {
//   try {
//     const loans = await Loan.findAll({
//       attributes: ['loan_id','book_id','borrower_id','borrow_date','return_date']
//     });
//     if (loans.length === 0) {
//       return res.status(404).json({ message: "No loans found" });
//     }
//     res.json(loans);
//   } catch (err) {
//     console.error("Error retrieving loans:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// // -------------------------------------------------------------------
// // Report Route: outstanding loans + bestseller author
// app.get("/api/report", (req, res) => {
//   const { start, end } = req.query;
//   if (!start || !end) {
//     return res.status(400).json({ error: "start and end dates required" });
//   }

//   const detailQ = `
//     SELECT
//       l.loan_id,
//       b.book_name,
//       br.borrower_name,
//       DATEDIFF(CURDATE(), l.borrow_date) AS days_with
//     FROM loan AS l
//       FORCE INDEX (ix_loan_return_borrow_date, ix_loan_book_id, ix_loan_borrower_id)
//     JOIN books AS b       ON l.book_id     = b.book_id
//       FORCE INDEX (PRIMARY, ix_books_author_id)
//     JOIN borrowers AS br  ON l.borrower_id = br.borrower_id
//     WHERE
//       l.return_date IS NULL
//       AND l.borrow_date BETWEEN ? AND ?;
//   `;

//   const bestQ = `
//     SELECT
//       a.author_name,
//       COUNT(*) AS borrow_count
//     FROM loan AS l
//       FORCE INDEX (ix_loan_return_borrow_date, ix_loan_book_id)
//     JOIN books AS b     ON l.book_id   = b.book_id
//       FORCE INDEX (PRIMARY, ix_books_author_id)
//     JOIN author AS a    ON b.author_id = a.author_id
//     WHERE
//       l.return_date IS NULL
//       AND l.borrow_date BETWEEN ? AND ?
//     GROUP BY a.author_id
//     ORDER BY borrow_count DESC
//     LIMIT 1;
//   `;

//   db.query(detailQ + bestQ, [start, end, start, end], (err, results) => {
//     if (err) {
//       console.error("DB error in report:", err);
//       return res.status(500).json({ error: "DB error" });
//     }
//     const [details, bestseller] = results;
//     res.json({
//       details,
//       bestseller: bestseller[0] || null
//     });
//   });
// });

// // Start server
// app.listen(5174, () => {
//   console.log("conn to backend")
// });


// index.js
// import express from "express";
// import mysql from "mysql2";
// import cors from "cors";

// import Author   from "./models/Author.js";
// import Book     from "./models/Book.js";
// import Loan     from "./models/Loan.js";
// import Borrower from "./models/Borrower.js";
// import { sequelize } from "./db.js";

// // Sync Sequelize models
// sequelize.sync()
//   .then(() => console.log("Database connected & models synced"))
//   .catch(err => console.error("Error syncing database:", err));

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MySQL connection (enable multipleStatements for back-to-back SELECTs)
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "cs348_project",
//   multipleStatements: true
// });

// db.connect(err => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL database");

//   // Create indexes once (ignore errors if they already exist)
//   const indexStmts = [
//     `CREATE INDEX ix_loans_return_borrow_date ON loans (return_date, borrow_date)`,
//     `CREATE INDEX ix_loans_book_id           ON loans (book_id)`,
//     `CREATE INDEX ix_loans_borrower_id       ON loans (borrower_id)`,
//     `CREATE INDEX ix_books_author_id        ON books (author_id)`
//   ];
//   indexStmts.forEach(sql =>
//     db.query(sql, err => {
//       if (err && err.errno !== 1061)  // 1061 = ER_DUP_KEYNAME
//         console.error("Error creating index:", err);
//     })
//   );
// });

// // Health check
// app.get("/", (req, res) => {
//   res.json("this is the backend");
// });

// // CRUD for Author
// app.get("/api/author", (req, res) => {
//   db.query("SELECT * FROM authors", (err, data) => {
//     if (err) {
//       console.error("Error querying database:", err);
//       return res.status(500).json(err);
//     }
//     res.json(data);
//   });
// });

// app.post("/api/author", async (req, res) => {
//   try {
//     const { author_name, age } = req.body;
//     const newAuthor = await Author.create({ author_name, age });
//     res.status(201).json({ message: "Author added successfully", author: newAuthor });
//   } catch (err) {
//     console.error("Error adding author:", err);
//     res.status(500).json({ error: "Error adding author" });
//   }
// });

// app.get("/api/author/:id", async (req, res) => {
//   try {
//     const [rows] = await db.promise().execute(
//       "SELECT * FROM authors WHERE author_id = ?",
//       [req.params.id]
//     );
//     if (rows.length === 0) return res.status(404).json({ message: "Author not found" });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error("Error retrieving author:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// app.put("/api/author/:id", (req, res) => {
//   const { author_name, age } = req.body;
//   db.query(
//     "UPDATE authors SET author_name = ?, age = ? WHERE author_id = ?",
//     [author_name, age, req.params.id],
//     err => {
//       if (err) {
//         console.error("Error updating author:", err);
//         return res.status(500).json(err);
//       }
//       res.json({ message: "Author updated successfully" });
//     }
//   );
// });

// app.delete("/api/author/:id", async (req, res) => {
//   try {
//     await db.promise().execute("DELETE FROM authors WHERE author_id = ?", [req.params.id]);
//     res.json({ message: "Author deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting author:", err);
//     res.status(500).json(err);
//   }
// });

// // CRUD for Book
// app.post("/api/books", async (req, res) => {
//   try {
//     const { book_name, genre, author_id } = req.body;
//     const newBook = await Book.create({ book_name, genre, author_id });
//     res.status(201).json(newBook);
//   } catch (err) {
//     console.error("Error adding book:", err);
//     res.status(500).json({ error: "Error adding book" });
//   }
// });

// app.get("/api/books", async (req, res) => {
//   try {
//     const books = await Book.findAll();
//     if (books.length === 0) return res.status(404).json({ message: "No books found" });
//     res.json(books);
//   } catch (err) {
//     console.error("Error retrieving books:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// // List all loans (home)
// app.get("/home", async (req, res) => {
//   try {
//     const loans = await Loan.findAll({
//       attributes: ["loan_id", "book_id", "borrower_id", "borrow_date", "return_date"]
//     });
//     if (loans.length === 0) return res.status(404).json({ message: "No loans found" });
//     res.json(loans);
//   } catch (err) {
//     console.error("Error retrieving loans:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// // -------------------------------------------------------------------
// // Report Route: outstanding loans + bestseller author
// app.get("/api/report", (req, res) => {
//   const { start, end } = req.query;
//   if (!start || !end) {
//     return res.status(400).json({ error: "start and end dates required" });
//   }

//   const detailQ = `
//     SELECT
//       l.loan_id,
//       b.book_name,
//       br.borrower_name,
//       DATEDIFF(CURDATE(), l.borrow_date) AS days_with
//     FROM loans AS l
//       FORCE INDEX (ix_loans_return_borrow_date, ix_loans_book_id, ix_loans_borrower_id)
//     JOIN books AS b
//       FORCE INDEX (ix_books_author_id)
//       ON l.book_id = b.book_id
//     JOIN borrowers AS br
//       ON l.borrower_id = br.borrower_id
//     WHERE
//       l.return_date IS NULL
//       AND l.borrow_date BETWEEN ? AND ?;
//   `;

//   const bestQ = `
//     SELECT
//       a.author_name,
//       COUNT(*) AS borrow_count
//     FROM loans AS l
//       FORCE INDEX (ix_loans_return_borrow_date, ix_loans_book_id)
//     JOIN books AS b
//       FORCE INDEX (ix_books_author_id)
//       ON l.book_id = b.book_id
//     JOIN authors AS a
//       ON b.author_id = a.author_id
//     WHERE
//       l.return_date IS NULL
//       AND l.borrow_date BETWEEN ? AND ?
//     GROUP BY a.author_id
//     ORDER BY borrow_count DESC
//     LIMIT 1;
//   `;

//   db.query(detailQ + bestQ, [start, end, start, end], (err, results) => {
//     if (err) {
//       console.error("DB error in report:", err);
//       return res.status(500).json({ error: "DB error" });
//     }
//     const [details, bestArr] = results;
//     res.json({
//       details,
//       bestseller: bestArr[0] ?? null
//     });
//   });
// });

// // Start server
// app.listen(5174, () => {
//   console.log("Server listening on port 5174");
// });



// index.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";

import Author   from "./models/Author.js";
import Book     from "./models/Book.js";
import Loan     from "./models/Loan.js";
import Borrower from "./models/Borrower.js";
import { sequelize } from "./db.js";

// Sync Sequelize models
sequelize.sync()
  .then(() => console.log("Database connected & models synced"))
  .catch(err => console.error("Error syncing database:", err));

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection (enable multipleStatements)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cs348_project",
  multipleStatements: true
});

db.connect(err => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");

  // Create indexes once (ignore “already exists” errors)
  const indexStmts = [
    `CREATE INDEX ix_loans_return_borrow_date ON loans (return_date, borrow_date)`,
    `CREATE INDEX ix_loans_book_id           ON loans (book_id)`,
    `CREATE INDEX ix_loans_borrower_id       ON loans (borrower_id)`,
    `CREATE INDEX ix_books_author_id         ON books (author_id)`
  ];
  indexStmts.forEach(sql => {
    db.query(sql, err => {
      if (err && err.errno !== 1061) // 1061 = index already exists
        console.error("Error creating index:", err);
    });
  });
});

// Health check
app.get("/", (req, res) => {
  res.json("this is the backend");
});

// CRUD for Author
app.get("/api/author", (req, res) => {
  db.query("SELECT * FROM author", (err, data) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json(err);
    }
    res.json(data);
  });
});

app.post("/api/author", async (req, res) => {
  try {
    const { author_name, age } = req.body;
    const newAuthor = await Author.create({ author_name, age });
    res.status(201).json({ message: "Author added successfully", author: newAuthor });
  } catch (err) {
    console.error("Error adding author:", err);
    res.status(500).json({ error: "Error adding author" });
  }
});

app.get("/api/author/:id", async (req, res) => {
  try {
    const [rows] = await db.promise()
      .execute("SELECT * FROM author WHERE author_id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Author not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error retrieving author:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/api/author/:id", (req, res) => {
  const { author_name, age } = req.body;
  db.query(
    "UPDATE author SET author_name = ?, age = ? WHERE author_id = ?",
    [author_name, age, req.params.id],
    err => {
      if (err) {
        console.error("Error updating author:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Author updated successfully" });
    }
  );
});

app.delete("/api/author/:id", async (req, res) => {
  try {
    await db.promise().execute("DELETE FROM author WHERE author_id = ?", [req.params.id]);
    res.json({ message: "Author deleted successfully" });
  } catch (err) {
    console.error("Error deleting author:", err);
    res.status(500).json(err);
  }
});

// CRUD for Book
app.post("/api/books", async (req, res) => {
  try {
    const { book_name, genre, author_id } = req.body;
    const newBook = await Book.create({ book_name, genre, author_id });
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Error adding book" });
  }
});

app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    if (books.length === 0) return res.status(404).json({ message: "No books found" });
    res.json(books);
  } catch (err) {
    console.error("Error retrieving books:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// List all loans (home)
app.get("/home", async (req, res) => {
  try {
    const loans = await Loan.findAll({
      attributes: ["loan_id","book_id","borrower_id","borrow_date","return_date"]
    });
    if (loans.length === 0) return res.status(404).json({ message: "No loans found" });
    res.json(loans);
  } catch (err) {
    console.error("Error retrieving loans:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// -------------------------------------------------------------------
// Report Route: outstanding loans + bestseller author
app.get("/api/report", (req, res) => {
  const { start, end } = req.query;
  if (!start || !end) {
    return res.status(400).json({ error: "start and end dates required" });
  }

  const detailQ = `
    SELECT
      l.loan_id,
      b.book_name,
      br.borrower_name,
      DATEDIFF(CURDATE(), l.borrow_date) AS days_with
    FROM loans AS l
    JOIN books AS b
      ON l.book_id     = b.book_id
    JOIN borrowers AS br
      ON l.borrower_id = br.borrower_id
    WHERE
      l.return_date IS NULL
      AND l.borrow_date BETWEEN ? AND ?;
  `;

  const bestQ = `
    SELECT
      a.author_name,
      COUNT(*) AS borrow_count
    FROM loans AS l
    JOIN books AS b
      ON l.book_id   = b.book_id
    JOIN author AS a
      ON b.author_id = a.author_id
    WHERE
      l.return_date IS NULL
      AND l.borrow_date BETWEEN ? AND ?
    GROUP BY a.author_id
    ORDER BY borrow_count DESC
    LIMIT 1;
  `;

  db.query(detailQ + bestQ, [start, end, start, end], (err, results) => {
    if (err) {
      console.error("DB error in report:", err);
      return res.status(500).json({ error: "DB error" });
    }
    const [details, bestArr] = results;
    res.json({
      details,
      bestseller: bestArr[0] ?? null
    });
  });
});

// Start server
app.listen(5174, () => {
  console.log("Server listening on port 5174");
});
