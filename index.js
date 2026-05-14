import express from "express";
import pg from "pg";
import "dotenv/config";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentYear = new Date().getFullYear();

app.get("/", async (req, res) => {
  const result = await db.query(
    "SELECT * FROM books WHERE EXTRACT(YEAR FROM created_at) = $1 ORDER BY created_at",
    [currentYear],
  );
  res.render("index.ejs", {
    bookList: result.rows,
    currentYear: currentYear,
  });
});

app.post("/add", async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const cover = req.body.cover_url;
  const score = req.body.score;
  const comment = req.body.comment;

  try {
    await db.query(
      "INSERT INTO books (title, author, cover_url, score, comment) VALUES ($1, $2, $3, $4, $5)",
      [title, author, cover, score, comment],
    );
    res.redirect("/");
  } catch (error) {
    console.error("Failed to save over DataBase:", error);
    res.status(500).send("Something went wrong when trying to save the book.");
  }
});

app.post("/edit", async (req, res) => {
  const { edit_id, title, author, cover_url, score, comment } = req.body;

  try {
    await db.query(
      "UPDATE books SET title = $1, author = $2, cover_url = $3, score = $4, comment = $5 WHERE id = $6",
      [title, author, cover_url, score, comment, edit_id],
    );
    res.redirect("/");
  } catch (error) {
    console.log("Error trying to update the book:", error);
    res.status(500).send("There was an error trying to update the book.");
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;

  try {
    await db.query("DELETE from books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (error) {
    console.error("Error trying to delete book:", error);
    res.status(500).send("There was an error trying to delete the book.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
