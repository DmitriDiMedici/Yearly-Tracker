// Managing modal
const modal = document.getElementById("add-book-modal");
const openBtn = document.getElementById("open-modal-btn");
const form = document.getElementById("book-modal-form");

openBtn.addEventListener("click", (event) => {
  event.preventDefault();

  document.getElementById("modal-title").textContent = "Add new book";
  document.getElementById("submit-btn").textContent = "Add review";

  form.reset();
  form.action = "/add";
  document.getElementById("edit-id-input").value = "";
  document.getElementById("score-input").value = 0;
  updateStars(0);

  modal.showModal();
});

const closeX = document.getElementById("close-x-btn");
const cancelBtn = document.getElementById("cancel-btn");

closeX.addEventListener("click", () => modal.close());
cancelBtn.addEventListener("click", () => modal.close());

// Star rating system
const stars = document.querySelectorAll("#star-rating-container i");
const scoreInput = document.getElementById("score-input");
const container = document.getElementById("star-rating-container");

function updateStars(valueToDisplay) {
  stars.forEach((s) => {
    const starValue = parseFloat(s.getAttribute("data-value"));
    s.classList.remove(
      "fa-regular",
      "fa-solid",
      "fa-star",
      "fa-star-half-stroke",
      "fa-star-half-alt",
    );

    if (valueToDisplay >= starValue) {
      s.classList.add("fa-solid", "fa-star");
    } else if (valueToDisplay === starValue - 0.5) {
      s.classList.add("fa-solid", "fa-star-half-stroke");
    } else {
      s.classList.add("fa-regular", "fa-star");
    }
  });
}

function calculateStarValue(e, starElement) {
  const rect = starElement.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const isHalf = mouseX < rect.width / 2;
  const baseValue = parseFloat(starElement.getAttribute("data-value"));

  return isHalf ? baseValue - 0.5 : baseValue;
}

stars.forEach((star) => {
  star.addEventListener("mousemove", (e) => {
    const hoverValue = calculateStarValue(e, star);
    updateStars(hoverValue);
  });

  star.addEventListener("click", (e) => {
    const finalValue = calculateStarValue(e, star);
    scoreInput.value = finalValue;
    updateStars(finalValue);
  });
});

container.addEventListener("mouseleave", () => {
  const savedValue = parseFloat(scoreInput.value) || 0;
  updateStars(savedValue);
});

// Autocomplete with api results
const BOOKS_API = "https://openlibrary.org/search.json";
const COVERS_API = "https://covers.openlibrary.org/b";

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const coverUrlInput = document.getElementById("cover_url");
const searchBtns = document.querySelectorAll(".search-api-btn");

async function fetchBookData() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title && !author) {
    alert("Please enter a title or author to search.");
  }

  searchBtns.forEach((btn) => btn.classList.add("loading"));

  try {
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (author) params.append("author", author);
    params.append("limit", "1");

    const response = await fetch(`${BOOKS_API}?${params.toString()}`);
    const data = await response.json();

    if (data.docs && data.docs.length > 0) {
      const book = data.docs[0];
      if (book.title) titleInput.value = book.title;
      if (book.author_name && book.author_name.length > 0) {
        authorInput.value = book.author_name[0];
      }
      if (book.cover_i) {
        coverUrlInput.value = `${COVERS_API}/id/${book.cover_i}-L.jpg`;
      } else if (book.isbn && book.isbn.length > 0) {
        coverUrlInput.value = `${COVERS_API}/isbn/${book.isbn[0]}-L.jpg`;
      } else {
        alert(
          "Book found, but no cover image is available. Please try typing a url manually",
        );
      }
    } else {
      alert("No books found matching those details");
    }
  } catch (error) {
    console.error("Error fetching from Open Library:", error);
    alert("Something went wrong");
  } finally {
    searchBtns.forEach((btn) => btn.classList.remove("loading"));
  }
}

document
  .getElementById("search-title-btn")
  .addEventListener("click", fetchBookData);
document
  .getElementById("search-author-btn")
  .addEventListener("click", fetchBookData);

// Dropdown menu stuff
document.addEventListener("click", (e) => {
  const isDropdownBtn = e.target.closest(".menu-dots-btn");
  if (!isDropdownBtn && e.target.closest(".dropdown-menu") === null) {
    document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
      menu.classList.remove("show");
    });
    return;
  }

  if (isDropdownBtn) {
    const currentDropdown = isDropdownBtn.nextElementSibling;
    document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
      if (menu !== currentDropdown) {
        menu.classList.remove("show");
      }
    });

    currentDropdown.classList.toggle("show");
  }

  // Edit stuff
  if (e.target.classList.contains("edit-btn")) {
    const btn = e.target;
    const form = document.getElementById("book-modal-form");

    document.getElementById("modal-title").textContent = "Edit book";
    document.getElementById("submit-btn").textContent = "Confirm";

    form.action = "/edit";

    document.getElementById("edit-id-input").value =
      btn.getAttribute("data-id");
    document.getElementById("title").value = btn.getAttribute("data-title");
    document.getElementById("author").value = btn.getAttribute("data-author");
    document.getElementById("cover_url").value = btn.getAttribute("data-cover");
    document.getElementById("comment").value = btn.getAttribute("data-comment");

    const score = parseFloat(btn.getAttribute("data-score"));
    document.getElementById("score-input").value = score;
    updateStars(score);

    btn.closest(".dropdown-menu").classList.remove("show");
    modal.showModal();
  }
});
