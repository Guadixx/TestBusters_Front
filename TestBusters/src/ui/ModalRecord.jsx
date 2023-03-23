import { useState } from 'react';
import styled from 'styled-components';

//import { UserContext } from '../context/UserContext';
//import { API } from '../services/API';
import Palette from '../styles/Palette';
import Button from './Button';
import CircleBar from './CircleBar';
import DivProgress from './DivProgress';
import Rating from './Rating';

const ModalRecordStyled = styled.div`
  & .hidden {
    display: none !important;
  }
  & .modal-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 2rem;
    gap: 2rem;
    border-radius: 10px;
    background-color: ${Palette.color_bg};
    animation-name: vibrar;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  }
  & .modal {
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
  & .circlebar {
    display: flex;
    gap: 200px;
  }
  & .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    gap: 20px;
  }
  & .containers {
    display: flex;
    text-align: left;
    gap: 20px;
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

const ModalRecord = ({ text }) => {
  //const { user } = useContext(UserContext);
  //const [userProfile, setUserProfile] = useState([]);
  const [modal, setModal] = useState(false);

  /*const getUser = () => {
    API.get(`/users/${user._id}`).then((res) => {
      setUserProfile(res.data.user);
    });
  };

  useEffect(() => {
    getUser();
  }, []);*/
  return (
    <ModalRecordStyled>
      <div>
        <button
          onClick={() => {
            setModal(!modal);
          }}
        >
          {text}
        </button>
      </div>
      <div className={modal ? 'modal' : 'hidden'}>
        <div className="modal-container">
          <div className="circlebar">
            <div className="rating">
              <h2>Rate the test!!</h2>
              <Rating width="30px" height="30px" />
            </div>
            <CircleBar widtha="200px" />
          </div>
          <div className="containers">
            <div>
              <h3>Last score</h3>
              <div className="bar">
                <h4>score</h4>
                <DivProgress widtha="200px" widthb="400px" heighta="24" />
              </div>
              <div className="bar">
                <h4>time</h4>
                <DivProgress widtha="200px" widthb="400px" heighta="24" />
              </div>
            </div>
            <div>
              <h3>Record</h3>
              <div className="bar">
                <h4>score</h4>
                <DivProgress widtha="200px" widthb="400px" heighta="24" />
              </div>
              <div className="bar">
                <h4>time</h4>
                <DivProgress widtha="200px" widthb="400px" heighta="24" />
              </div>
            </div>
          </div>
          <div className="button">
            <Button
              fixed_width={'100px'}
              textAfter="Close results"
              size="4"
              background={Palette.color_highlight_primary}
              color={Palette.color_bg}
              action={() => {
                setModal(!modal);
              }}
            />
          </div>
        </div>
      </div>
    </ModalRecordStyled>
  );
};

export default ModalRecord;
