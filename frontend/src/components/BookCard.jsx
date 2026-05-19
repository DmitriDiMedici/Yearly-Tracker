import React from "react";

function BookCard({ book }) {
  // Star rating system
  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (score >= i) {
        stars.push(<i key={i} className="fa-solid fa-star"></i>);
      } else if (score >= i - 0.5) {
        stars.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
      } else {
        stars.push(<i key={i} className="fa-regular fa-star"></i>);
      }
    }
    return stars;
  };

  // Date format
  const formattedDate = new Date(book.created_at).toLocaleDateString("en-EN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="card">
      <div className="card-actions">
        <button className="menu-dots-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
        <div className="dropdown-menu">
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>

      <div className="card-image">
        <img src={book.cover_url} alt={`Portada de ${book.title}`} />
      </div>

      <div className="card-body">
        <h3 className="card-title">{book.title}</h3>
        <p className="author-name">By {book.author}</p>

        <div className="stars">{renderStars(book.score)}</div>

        <p className="card-text">{book.comment}</p>
        <p className="card-date">{formattedDate}</p>
      </div>
    </div>
  );
}

export default BookCard;
