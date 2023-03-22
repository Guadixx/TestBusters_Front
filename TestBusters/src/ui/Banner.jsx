import styled from 'styled-components';

const BannerStyled = styled.div`
  & img {
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80vw;
    padding: ${({ padding }) => padding};
    margin: ${({ margin }) => margin};
    position: ${({ position }) => position};
    height: ${({ size }) =>
      size === 'xl'
        ? '10rem'
        : size === 'm'
        ? '6rem'
        : size === 's'
        ? '4.5rem '
        : '6rem'};
  }
`;

const Banner = ({ size, src, name, position, margin, padding }) => {
  return (
    <BannerStyled size={size} position={position} margin={margin} padding={padding}>
      <img src={src} alt={name} />
    </BannerStyled>
  );
};
export default Banner;
