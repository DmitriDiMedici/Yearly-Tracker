import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Subheader from "./components/Subheader";
import BookCard from "./components/BookCard";
import AddBookModal from "./components/AddBookModal";

const dummyBooks = [
  {
    id: 1,
    title: "King in Black Omnibus",
    author: "Donny Cates",
    cover_url:
      "https://m.media-amazon.com/images/I/91tN1p5fL0L._AC_UF1000,1000_QL80_.jpg", // Reemplaza con una URL real si esta falla
    score: 4,
    comment:
      "La historia principal es excelente. Leer los crossover que sucedieron...",
    created_at: "2026-03-05T12:00:00Z",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover_url:
      "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg", // Reemplaza con una URL real si esta falla
    score: 4.5,
    comment:
      "Me gustó que no es auto ayuda, los consejos y herramientas están fundamentados...",
    created_at: "2026-03-23T12:00:00Z",
  },
];

function App() {
  let currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main>
        <Header
          currentYear={currentYear}
          onOpenModal={() => setIsModalOpen(true)}
        />
        <Subheader currentYear={currentYear} />
        <div className="container book-grid">
          {dummyBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
      <Footer />
      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default App;
