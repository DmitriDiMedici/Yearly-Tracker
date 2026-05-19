import React, { useRef, useEffect, useState } from "react";

function AddBookModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  // Stars stuff
  const calculateStarValue = (e, baseValue) => {
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const isHalf = mouseX < rect.width / 2;
    return isHalf ? baseValue - 0.5 : baseValue;
  };

  return (
    <dialog
      ref={modalRef}
      className="modal"
      id="add-book-modal"
      onCancel={onClose}
    >
      <div className="modal-header">
        <h3 id="modal-title">Add new book</h3>
        <button
          className="close-x"
          id="close-x-btn"
          onClick={onClose}
          type="button"
        >
          &times;
        </button>
      </div>

      <form id="book-modal-form">
        <div className="form-group">
          <label htmlFor="title">Book Title</label>
          <div className="input-with-btn">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter book title"
              required
            />
            <button
              type="button"
              className="search-api-btn"
              id="search-title-btn"
              title="Auto-fill from Open Library"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <div className="input-with-btn">
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter author name"
              required
            />
            <button
              type="button"
              className="search-api-btn"
              id="search-title-btn"
              title="Auto-fill from Open Library"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cover_url">Cover Image URL</label>
          <input
            type="url"
            id="cover_url"
            name="cover_url"
            placeholder="https://example.com/cover.jpg"
            required
          />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <div className="rating-input" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((star) => {
              const displayValue = hover || rating;

              let starClass = "fa-regular fa-star";
              if (displayValue >= star) {
                starClass = "fa-solid fa-star";
              } else if (displayValue >= star - 0.5) {
                starClass = "fa-solid fa-star-half-stroke";
              }

              return (
                <i
                  key={star}
                  className={starClass}
                  onMouseMove={(e) => setHover(calculateStarValue(e, star))}
                  onClick={(e) => setRating(calculateStarValue(e, star))}
                  style={{ cursor: "pointer" }}
                ></i>
              );
            })}
          </div>
          <input type="hidden" name="score" value={rating} required min="0.5" />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            id="comment"
            rows="3"
            placeholder="Share your thoughts about this book..."
          ></textarea>
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="btn-cancel"
            id="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="btn-submit" id="submit-btn">
            Add review
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default AddBookModal;
