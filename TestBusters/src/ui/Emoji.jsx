import React, { useState } from 'react';
import styled from 'styled-components';

import Palette from '../styles/Palette';
const EmojiStyled = styled.div`
  display: flex;
  position: relative;
  & .modal {
    position: absolute;
    top: 0;
    left: 20%;
    display: flex;
    flex-direction: row;
    z-index: 1;
  }
  & .modal > button {
    background: none;
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    background-color: ${Palette.color_bg};
    :hover {
      transform: scale(1.2);
      transition: all 0.2s ease-in-out;
    }
  }
  & .result {
    display: flex;
  }
  & .result > div > button {
    background: none;
    position: relative;
    gap: 2px;
  }
`;

const ButtonStyled = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
    transition: all 0.2s ease-in-out;
  }
`;

const EmojiButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [countz, setCountz] = useState(0);
  const [countx, setCountx] = useState(0);
  const [countc, setCountc] = useState(0);

  const handleMouseEnter = () => {
    setIsModalOpen(true);
  };

  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };

  return (
    <EmojiStyled>
      <ButtonStyled onMouseEnter={handleMouseEnter}>😊+</ButtonStyled>
      {isModalOpen && (
        <div className="modal">
          <button
            onMouseLeave={handleMouseLeave}
            onClick={() => setCount((count) => count + 1)}
          >
            😅
          </button>
          <button
            onMouseLeave={handleMouseLeave}
            onClick={() => setCountz((countz) => countz + 1)}
          >
            🙌
          </button>
          <button
            onMouseLeave={handleMouseLeave}
            onClick={() => setCountx((countx) => countx + 1)}
          >
            ❤
          </button>
          <button
            onMouseLeave={handleMouseLeave}
            onClick={() => setCountc((countc) => countc + 1)}
          >
            👍
          </button>
        </div>
      )}
      <div className="result">
        <div>
          {count < 1 ? (
            <button style={{ display: 'none' }}>Botón</button>
          ) : (
            <button onClick={() => setCount((count) => count + 1).setValor(count - 1)}>
              😅{count}
            </button>
          )}
        </div>
        <div>
          {countz < 1 ? (
            <button style={{ display: 'none' }}>Botón</button>
          ) : (
            <button
              onClick={() => setCountz((countz) => countz + 1).setValor(countz - 1)}
            >
              🙌{countz}
            </button>
          )}
        </div>
        <div>
          {countx < 1 ? (
            <button style={{ display: 'none' }}>Botón</button>
          ) : (
            <button
              onClick={() => setCountx((countx) => countx + 1).setValor(countx - 1)}
            >
              ❤{countx}
            </button>
          )}
        </div>
        <div>
          {countc < 1 ? (
            <button style={{ display: 'none' }}>Botón</button>
          ) : (
            <button
              onClick={() => setCountc((countc) => countc + 1).setValor(countc - 1)}
            >
              👍{countc}
            </button>
          )}
        </div>
      </div>
    </EmojiStyled>
  );
};

export default EmojiButton;
