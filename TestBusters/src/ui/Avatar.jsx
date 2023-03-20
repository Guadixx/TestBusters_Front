import styled from 'styled-components';

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
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  position: ${({ position }) => position};
  border-radius: 0.8rem;
  object-fit: cover;
  filter: ${({ filter }) => filter};
`;

const Avatar = ({ filter, justify, align, src, alt, height, width, position }) => {
  return (
    <AvatarStyled
      filter={filter}
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
