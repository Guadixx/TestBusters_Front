import styled from 'styled-components';

import Palette from '../styles/Palette';
import { Spacing } from '../styles/Spacing';

const Heading1Styled = styled.h1`
  font-family: ${({ font }) => (font ? font : 'Helvetica, Arial, sans-serif')};
  font-size: ${({ size }) => (size ? size : Spacing._5)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: 550;
`;
export const Heading_1 = ({ font, size, color, text }) => {
  return (
    <Heading1Styled font={font} size={size} color={color} text={text}>
      {text}
    </Heading1Styled>
  );
};
const Heading2Styled = styled.h2`
  font-family: ${({ font }) => (font ? font : 'Helvetica, Arial, sans-serif')};
  font-size: ${({ size }) => (size ? size : Spacing._4)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: 300;
`;
export const Heading_2 = ({ font, size, color, text }) => {
  return (
    <Heading2Styled font={font} size={size} color={color} text={text}>
      {text}
    </Heading2Styled>
  );
};
const Heading3Styled = styled.h3`
  font-family: ${({ font }) => (font ? font : 'Helvetica, Arial, sans-serif')};
  font-size: ${({ size }) => (size ? size : Spacing._4)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: 300;
`;
export const Heading_3 = ({ font, size, color, text }) => {
  return (
    <Heading3Styled font={font} size={size} color={color} text={text}>
      {text}
    </Heading3Styled>
  );
};
const Heading4Styled = styled.h4`
  font-family: ${({ font }) => (font ? font : 'Helvetica, Arial, sans-serif')};
  font-size: ${({ size }) => (size ? size : Spacing._3)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: 300;
`;
export const Heading_4 = ({ font, size, color, text }) => {
  return (
    <Heading4Styled font={font} size={size} color={color} text={text}>
      {text}
    </Heading4Styled>
  );
};
const Heading5Styled = styled.h5`
  font-family: ${({ font }) => (font ? font : 'Helvetica, Arial, sans-serif')};
  font-size: ${({ size }) => (size ? size : Spacing._3)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: 200;
`;
export const Heading_5 = ({ font, size, color, text }) => {
  return (
    <Heading5Styled font={font} size={size} color={color} text={text}>
      {text}
    </Heading5Styled>
  );
};
const Heading6Styled = styled.h6`
  font-family: ${({ font }) => (font ? font : 'Helvetica, Arial, sans-serif')};
  font-size: ${({ size }) => (size ? size : Spacing._2)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: 200;
`;
export const Heading_6 = ({ font, size, color, text }) => {
  return (
    <Heading6Styled font={font} size={size} color={color} text={text}>
      {text}
    </Heading6Styled>
  );
};
