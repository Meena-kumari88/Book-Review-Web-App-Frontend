import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api'; // Make sure this path is correct
import './BookDetails.css'; // Import the CSS file

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ rating: '', comment: '' });

  useEffect(() => {
    axios.get(`/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
    
    axios.get(`/reviews/${id}`)
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmSubmit = window.confirm('Are you sure you want to submit this review?');
    
    if (confirmSubmit) {
      axios.post(`/reviews/${id}`, review)
        .then(res => {
          setReviews([...reviews, res.data]);
          setReview({ rating: '', comment: '' }); // Clear form after submission
        })
        .catch(error => console.error('Error posting review:', error));
    }
  };

  const handleStarClick = (index) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating: prevReview.rating === index + 1 ? 0 : index + 1 // Toggle rating
    }));
  };

  const renderStars = (rating) => {
    const stars = Array(5).fill(false).map((_, index) => index < rating);
    return (
      <div>
        {stars.map((filled, index) => (
          <span
            key={index}
            className={filled ? 'star filled' : 'star'}
            onClick={() => handleStarClick(index)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="book-details">
      <div className="book-details-content">
        <div className="book-image-container">
          <img src={book.imageUrl} alt={book.title} className="book-image" />
        </div>
        <div className="book-info">
          <h1>{book.title}</h1>
          <p><strong>Description:</strong> {book.description}</p>
          <h2>Reviews:</h2>
          <div className="reviews-container">
            {reviews.length > 0 ? (
              reviews.map(r => (
                <div key={r._id} className="review">
                  <p><strong>Rating:</strong> {renderStars(r.rating)}</p>
                  <p><strong>Comment:</strong> {r.comment}</p>
                  <p><strong>Date:</strong> {new Date(r.date).toLocaleDateString()}</p> {/* Display date */}
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
          <form onSubmit={handleSubmit} className="review-form">
            <div className="rating-input">
              <label htmlFor="rating">Rating:</label>
              <div className="star-rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`star ${review.rating > index ? 'filled' : ''}`}
                    onClick={() => handleStarClick(index)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <textarea
              placeholder="Comment"
              value={review.comment}
              onChange={e => setReview({ ...review, comment: e.target.value })}
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
