import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useLocalStorage from '../customHooks/useLocalStorage';
import { API } from '../services/API';
//import { UserContext } from '../context/UserContext';
//import { API } from '../services/API';
import Palette from '../styles/Palette';
import Button from './Button';
import DivProgress from './DivProgress';
import Rating from './Rating';

const ModalRecordStyled = styled.div`
  & .hidden {
    display: none !important;
  }
  & .modal-end-test-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 350px;
    padding: 2rem;
    gap: 2rem;
    border-radius: 10px;
    background-color: ${Palette.color_bg};
    animation-name: vibrar;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
    text-align: center;
  }
  & .modal-end-test {
    background-color: #5c5c5ca7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  & .ratings-end-test-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    gap: 40px;
  }
  & .circlebar-end-test-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 200px;
    margin-bottom: 40px;
    width: 100%;
  }
  & .rating-end-test-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
  }
  & .rating-end-test-container img {
    width: 80px;
  }

  & .rating-end-test-container h2 {
    font-size: 24px;
  }
  & .containers-end-test-container {
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    gap: 20px;
  }
  & .container-end-test-container {
    border-radius: 10px;
    padding: 20px 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1.5rem;
  }

  & .container-end-test-title {
    font-size: 22px;
    font-weight: 800;
  }

  & .bar-end-test-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 0.5rem;
  }
  & .stats-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .button-end-test-container {
    padding: 2rem;
  }

  @media screen and (max-width: 1200px) {
    & .containers-end-test-container {
      flex-direction: column;
      align-items: center;
    }
  }
  @media screen and (max-width: 650px) {
    & .modal-end-test-container {
      min-width: 350px;
      width: 90%;
      padding: 2rem 1rem;
    }
  }
  @keyframes vibrar {
    0% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const ModalRecord = ({
  text,
  timeRecord,
  maxScore,
  score,
  maxTime,
  scoreRecord,
  time,
  isNewRecord,
  userId,
  testId,
  testType,
}) => {
  useLocalStorage('set', 'rating', '-1');
  const navigate = useNavigate();
  const [modal, setModal] = useState(true);
  const [rating, setRating] = useState(true);
  const timeFormat = `${Math.floor(parseInt(time) / 60)}:${
    parseInt(time) - Math.floor(parseInt(time) / 60) * 60
  }`;

  const registerScore = () => {
    const stats = {
      userId: userId,
      testId: testId,
      score: `${score}/${maxScore}/${timeFormat}`,
      rating: parseInt(useLocalStorage('get', 'rating')),
      testType: testType,
    };
    useLocalStorage('set', 'rating', '-1');
    API.patch('/ultimate', stats)
      .then((res) => {
        if (res.status == 200) {
          return;
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ModalRecordStyled>
      <div className={modal ? 'modal-end-test' : 'modal-end-test hidden'}>
        <div className="modal-end-test-container">
          {rating ? (
            <div className="ratings-end-test-modal">
              <h2>{text}</h2>
              <h2>Did you enjoy the test? Consider rating 😊</h2>
              <Rating width="50px" height="50px" />
              <Button
                fixed_width={'100px'}
                textAfter="Continue"
                size="4"
                background={Palette.color_highlight_primary}
                color={Palette.color_bg}
                action={() => {
                  setRating(false);
                  registerScore();
                }}
              />
            </div>
          ) : (
            <div className="stats-container">
              <div className="circlebar-end-test-container">
                <div className="rating-end-test-container">
                  <>
                    {score / maxScore === 0 ? (
                      <>
                        <img
                          src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680167535/emoji-transparent-2018-32_yz1q50.png"
                          alt="emoji smile"
                        />
                        <h2>Dont worry, try again!!</h2>
                      </>
                    ) : score / maxScore < 0.2 ? (
                      <>
                        <img
                          src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680167535/emoji-transparent-2018-32_yz1q50.png"
                          alt="emoji smile"
                        />
                        <h2>Keep fighting!</h2>
                      </>
                    ) : score / maxScore < 0.4 ? (
                      <>
                        <img
                          src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680167464/face-with-stuck-out-tongue-and-winking-eye_1f61c_k6vaom.png"
                          alt="emoji star eyes"
                        />
                        <h2>Good job!!</h2>
                      </>
                    ) : score / maxScore < 0.6 ? (
                      <>
                        <img
                          src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680167464/face-with-stuck-out-tongue-and-winking-eye_1f61c_k6vaom.png"
                          alt="emoji star eyes"
                        />
                        <h2>Nice one pal!!</h2>
                      </>
                    ) : score / maxScore < 0.8 ? (
                      <>
                        <img
                          src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680167500/4_grande_fntwp0.png"
                          alt="emoji star eyes"
                        />
                        <h2>You are the best!!</h2>
                      </>
                    ) : (
                      <>
                        <img
                          src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680167593/3_grande_t6paml.png"
                          alt="emoji star eyes"
                        />
                        <h2>You are awesome!!</h2>
                      </>
                    )}
                  </>
                </div>
              </div>
              <div className="containers-end-test-container">
                <div className="container-end-test-container">
                  <h3 className="container-end-test-title">
                    {isNewRecord ? 'NEW RECORD!!!' : 'SCORE'}
                  </h3>
                  <div className="bar-end-test-container">
                    <DivProgress
                      widtha="200px"
                      widthb="400px"
                      widthc="180px"
                      value={score}
                      maxValue={maxScore}
                      type="score"
                      margintop="1rem"
                      text1="score"
                      marginright="1.5rem"
                      display2={window.innerWidth < 520 ? 'none' : 'block'}
                      display={window.innerWidth < 520 ? 'none' : 'block'}
                    />
                    <DivProgress
                      widtha="200px"
                      widthb="400px"
                      widthc="180px"
                      value={time}
                      maxValue={maxTime}
                      type="time"
                      text1="time"
                      display2={window.innerWidth < 520 ? 'none' : 'block'}
                      display={window.innerWidth < 520 ? 'none' : 'block'}
                    />
                  </div>
                </div>
                <div className="container-end-test-container">
                  <h3 className="container-end-test-title">RECORD</h3>
                  <div className="bar-end-test-container">
                    <DivProgress
                      widtha="200px"
                      widthb="400px"
                      widthc="180px"
                      value={scoreRecord}
                      maxValue={maxScore}
                      type="score"
                      text1="score"
                      margintop="1rem"
                      marginright="1.5rem"
                      display2={window.innerWidth < 520 ? 'none' : 'block'}
                      display={window.innerWidth < 520 ? 'none' : 'block'}
                    />
                    <DivProgress
                      widtha="200px"
                      widthb="400px"
                      widthc="180px"
                      value={timeRecord}
                      maxValue={maxTime}
                      type="time"
                      text1="time"
                      display={window.innerWidth < 520 ? 'none' : 'block'}
                      display2={window.innerWidth < 520 ? 'none' : 'block'}
                    />
                  </div>
                </div>
              </div>
              <div className="button-end-test-container">
                <Button
                  fixed_width={'150px'}
                  textAfter="Close results"
                  size="4"
                  background={Palette.color_highlight_primary}
                  color={Palette.color_bg}
                  action={() => {
                    setRating(true);
                    navigate(0);

                    setModal(!modal);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalRecordStyled>
  );
};

export default ModalRecord;
