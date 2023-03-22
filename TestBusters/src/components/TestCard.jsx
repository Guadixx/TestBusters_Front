import './TestCard.css';

import { useNavigate } from 'react-router-dom';

import Icons from '../styles/Icons';
import { Heading_4, Heading_5 } from '../ui/Headings';

//le entra por prop el test, todavía falta poner

const TestCard = () => {
  const navigate = useNavigate();

  return (
    <div className="testcard" onClick={() => navigate('/')}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/80/Collection-national-flags.png"
        alt="test thumbnail"
        className="test-thumbnail"
      />
      <div className="test-info">
        <div className="test-info-first">
          <Heading_4 text="Guess the flag" size="15px" weigth="600" />
          <div className="test-info-played">
            <img src={Icons.play} alt="play icon" className="play-icon" />
            <Heading_5 text="7829467" size="12px" />
          </div>
        </div>
        <div className="test-info-user">
          <img
            src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679405347/testbuster/byb4gfgoub2ayosybg1f.png"
            alt="user avatar"
          />
          <Heading_5 text="Rgrivas9" size="12px" />
        </div>
      </div>
    </div>
  );
};

export default TestCard;
