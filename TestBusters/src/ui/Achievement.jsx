import styled from 'styled-components';

const AchievementStyled = styled.div`
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
  object-fit: cover;
  overflow: hidden;

  img {
    transform: scale(0.15);
    object-fit: cover;
  }
`;

const Achievement = ({
  justify,
  align,
  src,
  alt,
  height,
  width,
  position,
  margin,
  padding,
}) => {
  return (
    <AchievementStyled
      justify={justify}
      align={align}
      height={height}
      width={width}
      position={position}
      margin={margin}
      padding={padding}
    >
      <img src={src} alt={alt} />
    </AchievementStyled>
  );
};

export default Achievement;
