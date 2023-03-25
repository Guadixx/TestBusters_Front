import React, { useState } from 'react';
import styled from 'styled-components';

import Palette from '../styles/Palette';

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10%;
  width: 100px;
  height: 80px;
  left: 100%;
  transform: translate(-50%, -50%);
  padding: 2px;
  background-color: #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: ${Palette.color_highlight_secondary};
`;

const HoverDiv = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const ModalHover = () => {
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  return (
    <HoverDiv onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {showModal && <ModalContainer> aquí encontrarás todos los tests </ModalContainer>}
    </HoverDiv>
  );
};

export default ModalHover;
