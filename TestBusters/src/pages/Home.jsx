import './Home.css';

import Carousel from '../components/Carousel';
import DayTest from '../components/DayTest';
import RandomTest from '../components/RandomTest';

export const Home = () => {
  return (
    <div>
      <Carousel />
      <DayTest />
      <RandomTest />
    </div>
  );
};
export default Home;
