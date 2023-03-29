/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './ScrollCarousel.css';

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../ui/Spinner';
import TestCard from '../TestCard';

const ScrollCarousel = ({ text, loaded, tests }) => {
  const ref = useRef();
  const navigate = useNavigate();

  const scroll = (offset) => {
    ref.current.scrollLeft += offset;
  };

  return (
    <section className="movie-carousel">
      <div className="movie-carousel-head">
        <h1>{text}</h1>

        <button
          onClick={() => {
            navigate('/tests');
          }}
        >
          View All
        </button>
      </div>

      <div className="scroll-container">
        <button className="prev" onClick={() => scroll(-1104)}>
          <img
            src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1676822765/Giphy/svg_xml_base64_PHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMTUgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9Im5vbmUiIGZpbGw9Im5vbmUiPjxnIHRyYW5zZm9ybT0idHJhbnN_afv3jd.svg"
            alt="prev icon"
          />
        </button>
        <div className="recent-movies" ref={ref}>
          {loaded ? (
            tests.map((test) => <TestCard test={test} key={test._id} />)
          ) : (
            <Spinner />
          )}
        </div>
        <button className="next" onClick={() => scroll(1104)}>
          <img
            src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1676822765/Giphy/svg_xml_base64_PHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMTUgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9Im5vbmUiIGZpbGw9Im5vbmUiPjxnIHRyYW5zZm9ybT0idHJhbnN_afv3jd.svg"
            alt="next icon"
          />
        </button>
      </div>
    </section>
  );
};

export default ScrollCarousel;
