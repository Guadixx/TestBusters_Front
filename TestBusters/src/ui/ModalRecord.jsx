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
    min-width: 500px;
    padding: 2rem;
    gap: 2rem;
    border-radius: 10px;
    background-color: ${Palette.color_bg};
    animation-name: vibrar;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  }
  & .modal-end-test {
    background-color: #cccccba7;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px 20px;
  }
  & .bar-end-test-container > h4 {
    position: relative;
    left: 10%;
    top: 50px;
  }
  & .stats-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .button-end-test-container {
    padding: 2rem;
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
  userRecord,
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
                  {userRecord ? (
                    <>
                      {parseInt(userRecord.score.split('/')[0]) /
                        parseInt(userRecord.score.split('/')[1]) ===
                      0 ? (
                        <>
                          <img
                            src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680167535/emoji-transparent-2018-32_yz1q50.png"
                            alt="emoji smile"
                          />
                          <h2>Dont worry, try again!!</h2>
                        </>
                      ) : parseInt(userRecord.score.split('/')[0]) /
                          parseInt(userRecord.score.split('/')[1]) <
                        0.2 ? (
                        <>
                          <img
                            src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680167535/emoji-transparent-2018-32_yz1q50.png"
                            alt="emoji smile"
                          />
                          <h2>Keep fighting!</h2>
                        </>
                      ) : parseInt(userRecord.score.split('/')[0]) /
                          parseInt(userRecord.score.split('/')[1]) <
                        0.4 ? (
                        <>
                          <img
                            src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680167464/face-with-stuck-out-tongue-and-winking-eye_1f61c_k6vaom.png"
                            alt="emoji star eyes"
                          />
                          <h2>Good job!!</h2>
                        </>
                      ) : parseInt(userRecord.score.split('/')[0]) /
                          parseInt(userRecord.score.split('/')[1]) <
                        0.6 ? (
                        <>
                          <img
                            src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680167464/face-with-stuck-out-tongue-and-winking-eye_1f61c_k6vaom.png"
                            alt="emoji star eyes"
                          />
                          <h2>Nice one pal!!</h2>
                        </>
                      ) : parseInt(userRecord.score.split('/')[0]) /
                          parseInt(userRecord.score.split('/')[1]) <
                        0.8 ? (
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
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="containers-end-test-container">
                <div className="container-end-test-container">
                  <h3>{isNewRecord ? 'New Record!!!' : 'Score'}</h3>
                  <div className="bar-end-test-container">
                    <h4>score</h4>
                    <DivProgress
                      widtha="200px"
                      widthb="400px"
                      heighta="27"
                      value={score}
                      maxValue={maxScore}
                      type="score"
                    />
                  </div>
                  <div className="bar-end-test-container">
                    <h4>time</h4>
                    <DivProgress
                      widtha="200px"
                      widthb="400px"
                      heighta="27"
                      value={time}
                      maxValue={maxTime}
                      type="time"
                    />
                  </div>
                </div>
                <div className="container-end-test-container">
                  <h3>Record</h3>
                  <div className="bar-end-test-container">
                    <h4>score</h4>
                    <DivProgress
                      widtha="200px"
                      widthb="400px"
                      heighta="27"
                      value={scoreRecord}
                      maxValue={maxScore}
                      type="score"
                    />
                  </div>
                  <div className="bar-end-test-container">
                    <h4>time</h4>
                    <DivProgress
                      widtha="200px"
                      widthb="400px"
                      heighta="27"
                      value={timeRecord}
                      maxValue={maxTime}
                      type="time"
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
