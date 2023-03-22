import styled from 'styled-components';

const BannerStyled = styled.div`
  & img {
    object-fit: cover;
    width: 100%;
    height: ${({ size }) =>
      size === 'xl'
        ? '7.5rem'
        : size === 'm'
        ? '6rem'
        : size === 's'
        ? '4.5rem '
        : '6rem'};
  }
`;

const Banner = ({ size, src, name }) => {
  return (
    <BannerStyled size={size}>
      <img src={src} alt={name} />
    </BannerStyled>
  );
};
export default Banner;
