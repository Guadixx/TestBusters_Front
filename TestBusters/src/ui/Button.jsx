import styled from 'styled-components';

import { Spacing } from '../styles/Spacing';
const ButtonStyled = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: ${({ fixed_width }) => (fixed_width ? fixed_width : 'max-content')};
  height: ${({ fixed_height }) => (fixed_height ? fixed_height : 'max-content')};
  font-size: ${({ size }) =>
    size == 1
      ? Spacing._1
      : size == 2
      ? Spacing._2
      : size == 3
      ? Spacing._3
      : size == 4
      ? Spacing._4
      : size == 5
      ? Spacing._5
      : size == 6
      ? Spacing._6
      : size == 7
      ? Spacing._7
      : Spacing._8};
  padding: ${({ size }) =>
    size == 1
      ? `${Spacing._1} ${Spacing._2}`
      : size == 2
      ? `${Spacing._1} ${Spacing._3}`
      : size == 3
      ? `${Spacing._1} ${Spacing._4}`
      : size == 4
      ? `${Spacing._1} ${Spacing._5}`
      : size == 5
      ? `${Spacing._2} ${Spacing._6}`
      : size == 6
      ? `${Spacing._2} ${Spacing._7}`
      : size == 7
      ? `${Spacing._2} ${Spacing._8}`
      : `${Spacing._2} ${Spacing._9}`};
  text-transform: capitalize;
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  border-radius: 5px;
  border: ${({ variant, size, color }) =>
    variant == 'border' && size < 7
      ? `1px solid ${color}`
      : variant == 'border' && size >= 7
      ? `2px solid ${color}`
      : 'none'};
  /*  border-bottom: ${({ variant, size }) =>
    variant == 'relief' && size < 5
      ? `1px solid gray`
      : variant == 'relief' && size >= 5 && `2px solid gray`}; */
  box-shadow: ${({ variant, size }) =>
    variant == 'relief' && size < 5
      ? `0px 5px 8px -5px gray`
      : variant == 'relief' && size >= 5 && `0px 6px 10px -5px  gray`};
  opacity: ${({ disabled }) => (disabled ? '30%' : '100%')};
  outline: none;
  gap: ${({ size }) =>
    size == 1
      ? Spacing._1
      : size == 2
      ? Spacing._2
      : size == 3
      ? Spacing._3
      : size == 4
      ? Spacing._3
      : size == 5
      ? Spacing._3
      : size == 6
      ? Spacing._4
      : size == 7
      ? Spacing._4
      : Spacing._4};
  &:hover {
    filter: ${({ disabled }) => (disabled ? 'brightness(100%)' : 'brightness(90%)')};
  }
  &:active {
    transform: ${({ disabled }) => (disabled ? 'scale(100%)' : 'scale(99.5%)')};
  }
  & img {
    filter: invert(100%);
    width: ${({ size }) =>
      size == 1
        ? Spacing._1
        : size == 2
        ? Spacing._2
        : size == 3
        ? Spacing._3
        : size == 4
        ? Spacing._4
        : size == 5
        ? Spacing._5
        : size == 6
        ? Spacing._6
        : size == 7
        ? Spacing._7
        : Spacing._8};
  }
`;
const Button = ({
  action,
  variant,
  color,
  mode = false,
  textBefore,
  textAfter,
  size,
  fixed_width,
  fixed_height,
  src,
  alt,
  background,
  margin,
  padding,
  type,
}) => {
  return (
    <ButtonStyled
      disabled={mode}
      onClick={action}
      variant={variant}
      color={color}
      size={size}
      fixed_width={fixed_width}
      fixed_height={fixed_height}
      background={background}
      src={src}
      alt={alt}
      margin={margin}
      padding={padding}
      type={type}
    >
      {textBefore}
      {src && <img src={src} alt={alt} />}
      {textAfter}
    </ButtonStyled>
  );
};
export default Button;
/* neutral: {
      _50: "#FFFFFF",
      _100: "#E6E6E6",
      _200: "#CCCCCC",
      _300: "#B3B3B3",
      _400: "#999999",
      _500: "#080808",
      _600: "#666666",
      _700: "#4D4D4D",
      _800: "#333333",
      _900: "#1A1A1A",
      _950: "#000000",
    }, */
