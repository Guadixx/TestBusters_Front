/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Create.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Palette from '../styles/Palette';
import Button from '../ui/Button';
import { Heading_2 } from '../ui/Headings';

const Create = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  return (
    <section className="create">
      <div
        className="create-page-featured-test"
        onClick={() => navigate('/create/featuredtest')}
      >
        <img
          src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679671220/achievements%20icons/setting_z1trlv.png"
          alt="filter icon"
        />
        <div className="Fcreatetest_title">
          <Heading_2
            text="FEATURED TEST"
            color={Palette.color_primary}
            weigth="800"
            size="20px"
          />
          <div
            className="img_info"
            onMouseEnter={() => setShowMessage(true)}
            onMouseLeave={() => setShowMessage(false)}
          >
            <img
              src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679932839/information-button_nezhsm.png"
              alt="information icon"
            />
            {showMessage && (
              <p className="message">
                We have out own data base with different topics you can choose from, get
                started!
              </p>
            )}
          </div>
        </div>
        <p>
          Unleash the power of knowledge! Create custom quizzes with our data collections.
        </p>
        <Button
          textBefore="Get started"
          size="4"
          background={Palette.color_highlight_primary}
          color={Palette.color_bg}
          action={() => navigate('/create/featuredtest')}
        />
      </div>
      <div
        className="create-page-generic-test"
        onClick={() => navigate('/create/generictest')}
      >
        <img
          src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679671220/achievements%20icons/quiz_grnq1p.png"
          alt="filter icon"
        />
        <div className="Gcreatetest_title">
          <Heading_2
            text="GENERIC TEST"
            color={Palette.color_primary}
            weigth="800"
            size="20px"
          />
          <div
            className="img_info"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          >
            <img
              src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679932839/information-button_nezhsm.png"
              alt="information icon"
            />
            {showInfo && (
              <p>
                Upload your own data, pictures, create your own questions, its really all
                up to you!
              </p>
            )}
          </div>
        </div>
        <p>Craft your own quiz, share your expertise. The power is in your hands!</p>
        <Button
          textBefore="Get started"
          size="4"
          background={Palette.color_highlight_primary}
          color={Palette.color_bg}
          action={() => navigate('/create/generictest')}
        />
      </div>
    </section>
  );
};

export default Create;
