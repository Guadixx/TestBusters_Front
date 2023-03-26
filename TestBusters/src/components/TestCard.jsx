/* eslint-disable jsx-a11y/click-events-have-key-events */
import './TestCard.css';

import { useNavigate } from 'react-router-dom';

import Icons from '../styles/Icons';
import { Heading_4, Heading_5 } from '../ui/Headings';

//le entra por prop el test, todavía falta poner

const TestCard = ({ test }) => {
  const navigate = useNavigate();

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="testcard"
      key={test._id}
      onClick={() => navigate(`/tests/${test._id}`)}
    >
      <img src={test.thumbnail} alt="test thumbnail" className="test-thumbnail" />
      <div className="test-info">
        <div className="test-info-first">
          <Heading_4 text={test.title} size="15px" weigth="600" />
          <div className="test-info-played">
            <img src={Icons.play} alt="play icon" className="play-icon" />
            <Heading_5 text={test.times_played} size="12px" />
          </div>
        </div>
        <div className="test-info-user">
          <img src={test.creator.avatar} alt="user avatar" />
          <Heading_5 text={test.creator.username} size="12px" />
        </div>
      </div>
    </div>
  );
};

export default TestCard;
