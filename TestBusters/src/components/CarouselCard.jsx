import './CarouselCard.css';

import { Heading_3 } from '../ui/Headings';
import RatingStatic from '../ui/RatingStatic';

const CarouselCard = ({ test }) => {
  return (
    <div className="carousel-card">
      <img src={test.banner} alt="test banner" className="carousel-card-banner" />
      <img
        src={test.thumbnail}
        alt="test thumbnail"
        className="carousel-card-thumbnail"
      />
      <div className="carousel-rating">
        <div className="carousel-card-info">
          <Heading_3 text={test.title} weigth="600" />
        </div>
        <RatingStatic rating={test.rating} width="18px" height="18px" />
      </div>
    </div>
  );
};

export default CarouselCard;
