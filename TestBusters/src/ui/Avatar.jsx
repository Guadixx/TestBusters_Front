import styled from 'styled-components';

import Palette from '../styles/Palette';

const AvatarStyled = styled.img`
  display: flex;
  justify-content: ${({ justify }) =>
    justify === 'center'
      ? 'center'
      : justify === 'flex-end'
      ? 'flex-end'
      : justify === 'flex-star'
      ? 'flex-star'
      : justify === 'space-around'
      ? 'space-around'
      : justify === 'space-between'
      ? 'space-between'
      : 'center'};
  align-items: ${({ align }) =>
    align === 'center'
      ? 'center'
      : align === 'flex-end'
      ? 'flex-end'
      : align === 'flex-star'
      ? 'flex-star'
      : align === 'space-around'
      ? 'space-around'
      : align === 'space-between'
      ? 'space-between'
      : 'center'};
  width: ${({ width }) =>
    width === 's'
      ? '20px'
      : width === 'm'
      ? '50px'
      : width === 'l'
      ? '100px'
      : width === 'xl'
      ? '200px'
      : '200px'};
  height: ${({ height }) =>
    height === 's'
      ? '20px'
      : height === 'm'
      ? '50px'
      : height === 'l'
      ? '100px'
      : height === 'xl'
      ? '200px'
      : '200px'};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  position: ${({ position }) => position};
  border-radius: 100rem;
  border: 5px solid ${Palette.color_highlight_primary};
  object-fit: cover;
`;

const Avatar = ({ justify, align, src, alt, height, width, position }) => {
  return (
    <AvatarStyled
      justify={justify}
      align={align}
      src={src}
      alt={alt}
      height={height}
      width={width}
      position={position}
    />
  );
};

export default Avatar;
