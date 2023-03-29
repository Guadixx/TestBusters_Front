import styled from 'styled-components';

const BannerStyled = styled.div`
  & img {
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: ${({ padding }) => padding};
    margin: ${({ margin }) => margin};
    position: ${({ position }) => position};
    height: ${({ size }) =>
      size === 'xl'
        ? '12rem'
        : size === 'm'
        ? '6rem'
        : size === 's'
        ? '4.5rem '
        : '6rem'};
  }
  border-radius: ${({ radius }) =>
    radius === 'xl'
      ? '0 0 10px 10px'
      : radius === 'm'
      ? '0 0 8px 8px'
      : radius === 's'
      ? '0 0 5px 5px '
      : '5px 5px 5px 5px'};
  overflow: hidden;
  z-index: ${({ zindex }) => zindex};
  width: ${({ width }) => width};
`;

const Banner = ({
  size,
  src,
  name,
  position,
  margin,
  padding,
  radius,
  zindex,
  width,
}) => {
  return (
    <BannerStyled
      size={size}
      position={position}
      margin={margin}
      padding={padding}
      radius={radius}
      zindex={zindex}
      width={width}
    >
      <img src={src} alt={name} />
    </BannerStyled>
  );
};
export default Banner;
