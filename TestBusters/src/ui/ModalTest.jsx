import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Palette from '../styles/Palette';
import Button from './Button';
const ModalTestStyled = styled.div`
  & .hidden {
    display: none !important;
  }
  & .modal-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 35%;
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
  & .buttons {
    display: flex;
  }

  & .exit-button {
    padding: 0.3rem 1.2rem;
    border: none;
    border-radius: 3px;
    transition: 0.1s all ease-in;
  }
  & .exit-button:hover {
    filter: brightness(90%);
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

const ModalTest = ({ text }) => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  return (
    <ModalTestStyled>
      <div>
        <button
          className="exit-button"
          onClick={() => {
            setModal(!modal);
          }}
        >
          {text}
        </button>
      </div>
      <div className={modal ? 'modal' : 'hidden'}>
        <div className="modal-container">
          <h3>Are you sure? You will lose all your progress.</h3>
          <div className="buttons">
            <Button
              fixed_width={'100px'}
              textAfter="No"
              size="4"
              margin={'10px'}
              background={Palette.color_bg}
              variant="border"
              action={() => {
                setModal(!modal);
              }}
            />
            <Button
              fixed_width={'100px'}
              textAfter="Yes"
              size="4"
              margin={'10px'}
              background={Palette.color_highlight_primary}
              color={Palette.color_bg}
              action={() => navigate(0)}
            />
          </div>
        </div>
      </div>
    </ModalTestStyled>
  );
};

export default ModalTest;
