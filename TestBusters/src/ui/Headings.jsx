import styled from 'styled-components';

import Palette from '../styles/Palette';
import { Spacing } from '../styles/Spacing';

const Heading1Styled = styled.h1`
  font-family: ${({ font }) => (font ? font : 'Figtree')};
  font-size: ${({ size }) => (size ? size : Spacing._5)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: ${({ weigth }) => (weigth ? weigth : 400)};
  z-index: ${({ z }) => z};
`;
export const Heading_1 = ({ font, size, color, text, z, weigth }) => {
  return (
    <Heading1Styled
      font={font}
      size={size}
      color={color}
      text={text}
      z={z}
      weigth={weigth}
    >
      {text}
    </Heading1Styled>
  );
};
const Heading2Styled = styled.h2`
  font-family: ${({ font }) => (font ? font : 'Figtree')};
  font-size: ${({ size }) => (size ? size : Spacing._4)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: ${({ weigth }) => (weigth ? weigth : 400)};
  z-index: ${({ z }) => z};
`;
export const Heading_2 = ({ font, size, color, text, z, weigth }) => {
  return (
    <Heading2Styled
      font={font}
      size={size}
      color={color}
      text={text}
      z={z}
      weigth={weigth}
    >
      {text}
    </Heading2Styled>
  );
};
const Heading3Styled = styled.h3`
  font-family: ${({ font }) => (font ? font : 'Figtree')};
  font-size: ${({ size }) => (size ? size : Spacing._4)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: ${({ weigth }) => (weigth ? weigth : 400)};
  margin-left: ${({ marginleft }) => (marginleft ? marginleft : 0)};
  margin-right: ${({ marginright }) => (marginright ? marginright : 0)};
  text-shadow: ${({ shadow }) => (shadow ? shadow : 0)};
  z-index: ${({ z }) => z};
`;
export const Heading_3 = ({
  font,
  size,
  color,
  text,
  z,
  weigth,
  marginleft,
  marginright,
  shadow,
}) => {
  return (
    <Heading3Styled
      font={font}
      size={size}
      color={color}
      text={text}
      z={z}
      weigth={weigth}
      marginleft={marginleft}
      marginright={marginright}
      shadow={shadow}
    >
      {text}
    </Heading3Styled>
  );
};
const Heading4Styled = styled.h4`
  font-family: ${({ font }) => (font ? font : 'Figtree')};
  font-size: ${({ size }) => (size ? size : Spacing._3)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: ${({ weigth }) => (weigth ? weigth : 400)};
  z-index: ${({ z }) => z};
`;
export const Heading_4 = ({ font, size, color, text, z, weigth }) => {
  return (
    <Heading4Styled
      font={font}
      size={size}
      color={color}
      text={text}
      z={z}
      weigth={weigth}
    >
      {text}
    </Heading4Styled>
  );
};
const Heading5Styled = styled.h5`
  font-family: ${({ font }) => (font ? font : 'Figtree')};
  font-size: ${({ size }) => (size ? size : Spacing._3)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: ${({ weigth }) => (weigth ? weigth : 400)};
  z-index: ${({ z }) => z};
`;
export const Heading_5 = ({ font, size, color, text, z, weigth }) => {
  return (
    <Heading5Styled
      font={font}
      size={size}
      color={color}
      text={text}
      z={z}
      weigth={weigth}
    >
      {text}
    </Heading5Styled>
  );
};
const Heading6Styled = styled.h6`
  font-family: ${({ font }) => (font ? font : 'Figtree')};
  font-size: ${({ size }) => (size ? size : Spacing._2)};
  color: ${({ color }) => (color ? color : Palette.color_primary)};
  font-weight: ${({ weigth }) => (weigth ? weigth : 400)};
  z-index: ${({ z }) => z};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  margin: ${({ margin }) => margin};
`;
export const Heading_6 = ({
  font,
  size,
  color,
  text,
  z,
  weigth,
  position,
  top,
  right,
  margin,
}) => {
  return (
    <Heading6Styled
      font={font}
      size={size}
      color={color}
      text={text}
      z={z}
      weigth={weigth}
      position={position}
      top={top}
      right={right}
      margin={margin}
    >
      {text}
    </Heading6Styled>
  );
};
