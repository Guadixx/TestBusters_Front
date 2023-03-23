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
      ? '60px'
      : width === 'l'
      ? '100px'
      : width === 'xl'
      ? '200px'
      : '180px'};
  height: ${({ height }) =>
    height === 's'
      ? '20px'
      : height === 'm'
      ? '60px'
      : height === 'l'
      ? '100px'
      : height === 'xl'
      ? '200px'
      : '180px'};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  position: ${({ position }) => position};
  border-radius: 100rem;
  border: 5px solid ${Palette.color_bg};
  object-fit: cover;
`;

const Avatar = ({
  justify,
  align,
  src,
  alt,
  height,
  width,
  position,
  margin,
  padding,
  scale,
}) => {
  return (
    <AvatarStyled
      justify={justify}
      align={align}
      src={src}
      alt={alt}
      height={height}
      width={width}
      position={position}
      margin={margin}
      padding={padding}
      scale={scale}
    />
  );
};

export default Avatar;
