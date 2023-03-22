import './Tests.css';

import Carousel from '../components/Carousel';
import TestCard from '../components/TestCard';
import Rating from '../ui/Rating';

const Tests = () => {
  return (
    <div className="home">
      <Carousel />
      <TestCard />
      <Rating width="25px" height="25px" />
    </div>
  );
};

export default Tests;
