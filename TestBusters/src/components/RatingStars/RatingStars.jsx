import './RatingStars.css';

import { useState } from 'react';

const RatingStars = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="rating-stars">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) && 'on'}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <div className="star"></div>
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
