import React, { useState } from 'react';
import styled from 'styled-components';

import Palette from '../styles/Palette';

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: ${Palette.color_secundary};
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: black;
  position: absolute;
  top: 200%;
  z-index: 1;
  width: 95px;
  padding: 0.8rem 0;
  font-weight: 400 !important;
`;

const HoverDiv = styled.div`
  position: relative;
  width: 6px;
  height: 6px;
  z-index: calc();
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
      {showModal && (
        <ModalContainer>
          <h4> aquí encontrarás todos los tests </h4>
        </ModalContainer>
      )}
    </HoverDiv>
  );
};

export default ModalHover;
