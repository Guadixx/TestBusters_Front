import './Tests.css';

import Carousel from '../components/Carousel';
import RatingStars from '../components/RatingStars/RatingStars';
import TestCard from '../components/TestCard';
import Rating from '../ui/Rating';

const Tests = () => {
  return (
    <div className="home">
      <Carousel />
      <TestCard />
      <RatingStars />
      <Rating width="25px" height="25px" />
    </div>
  );
};

export default Tests;
