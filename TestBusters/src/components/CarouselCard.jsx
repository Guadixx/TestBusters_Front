/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line jsx-a11y/click-events-have-key-events
// eslint-disable-next-line jsx-a11y/click-events-have-key-events
import './CarouselCard.css';

import { useNavigate } from 'react-router-dom';

import Palette from '../styles/Palette';
import { Heading_3 } from '../ui/Headings';

const CarouselCard = ({ test, loop }) => {
  const navigate = useNavigate();
  let testParams = { testType: 'featuredtests' };
  if (test != undefined) {
    const testType = test.test_type == 'generic' ? 'generictests' : 'featuredtests';
    testParams = { testType: testType };
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    test != undefined ? (
      <div className="carousel-card">
        <img src={test.banner} alt="test banner" className="carousel-card-banner" />
        <div
          className={loop ? 'carousel-navigate' : 'carousel-navigate carousel-animation'}
          onClick={() => navigate(`/tests/${test._id}`, { state: testParams })}
        >
          <img
            src={test.thumbnail}
            alt="test thumbnail"
            className="carousel-card-thumbnail"
          />
          <Heading_3
            text={test.title}
            size="24px"
            color={Palette.color_bg}
            shadow="3px 3px 3px #111010"
          />
        </div>
      </div>
    ) : (
      <div className="carousel-card">
        <div className="carousel-card-info">
          <Heading_3
            text="oops, something went wrong..."
            color={Palette.color_bg}
            shadow="3px 3px 3px #111010"
          />
        </div>
      </div>
    )
  );
};

export default CarouselCard;
