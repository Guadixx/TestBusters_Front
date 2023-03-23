import { useState } from 'react';
import styled from 'styled-components';

import Palette from '../styles/Palette';
import Button from './Button';
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
  const [modal, setModal] = useState(false);

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
          <Rating />
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
