import styled from 'styled-components';

import Palette from '../styles/Palette';

const StaticsStyled = styled.div`
  padding: 3rem;
  margin: 1rem;
`;

const StaticPercentage = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  letter-spacing: 2.5px;
  color: ${Palette.color_primary};
  margin: 0.2rem;
`;

const StaticText = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  letter-spacing: 1.8px;
  color: ${Palette.color_primary};
  margin: 0.6rem;
  text-transform: uppercase;
`;

const Statics = ({ text, percentage }) => {
  return (
    <StaticsStyled>
      <StaticPercentage>{percentage}</StaticPercentage>
      <StaticText>{text}</StaticText>
    </StaticsStyled>
  );
};
export default Statics;
