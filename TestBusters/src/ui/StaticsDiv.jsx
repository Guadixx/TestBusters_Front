import styled from 'styled-components';

import Palette from '../styles/Palette';
import { Spacing } from '../styles/Spacing';

const StaticsStyled = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StaticPercentage = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${Spacing._8};
  color: ${Palette.color_primary};
`;

const StaticText = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${Spacing._3};
  color: ${Palette.color_primary};
  margin-top: ${Spacing._1};
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
