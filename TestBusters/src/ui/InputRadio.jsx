import styled from 'styled-components';

import Palette from '../styles/Palette';

const StyledText = styled.h4`
  font-size: 1.4rem;
  margin: 0.3rem;
  color: ${Palette.color_primary};
`;
const RatioInputStyled = styled.div`
  margin: 0.5rem;
  font-size: 1rem;
  & input {
    margin: 0.8rem;
    cursor: pointer;
    font-size: 22px;
  }
`;

const InputRatio = ({ options, name, text }) => {
  return (
    <StyledText>
      {text}
      <RatioInputStyled>
        <input type="radio" name={name} />
        <label>{options}</label>
      </RatioInputStyled>
    </StyledText>
  );
};
export default InputRatio;
