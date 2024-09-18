import React, { useEffect, useState } from 'react';
import axios from '../api'; // Make sure this path is correct
import './HomePage.css'; // Import the CSS file

function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="homepage">
      <h1 className="title">Book List</h1>
      <div className="book-grid">
        {books.map(book => (
          <div className="book-card" key={book._id}>
            <img src={book.imageUrl} alt={book.title} className="book-image" />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author"><strong>Author:</strong> {book.author}</p>
            <p className="book-description">{book.description}</p>
            <a href={`/books/${book._id}`} className="view-reviews">View Reviews</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
