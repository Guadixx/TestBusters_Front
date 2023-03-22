import React, { useState } from 'react';
import styled from 'styled-components';

const InputStyled = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px 10px;
  font-size: 16px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const PlaceholderLabel = styled.label`
  position: absolute;
  top: ${({ Onfocus }) => (Onfocus ? '0' : '10px')};
  left: 10px;
  font-size: ${({ Onfocus }) => (Onfocus ? '10px' : '16px')};
  color: ${({ Onfocus }) => (Onfocus ? '#bdbdbd' : '#424242')};
  transition: all 0.2s ease-in-out;
  pointer-events: none;
`;

const Input = ({ placeholder }) => {
  const [Onfocus, setOnFocus] = useState(false);
  const handleInputFocus = () => setOnFocus(true);
  const handleInputBlur = (event) => {
    if (!event.target.value) {
      setOnFocus(false);
    }
  };

  return (
    <InputStyled>
      <StyledInput onFocus={handleInputFocus} onBlur={handleInputBlur} />
      <PlaceholderLabel Onfocus={Onfocus}>{placeholder}</PlaceholderLabel>
    </InputStyled>
  );
};

export default Input;
