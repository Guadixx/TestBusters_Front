import styled from 'styled-components';

const ImageStyled = styled.div`
  overflow: hidden;
  & img {
    width: ${({ width }) => (width ? width : '22rem')};
    height: ${({ height }) => (height ? height : '18rem')};
    border-radius: ${({ radius }) =>
      radius === 'xl'
        ? '18px'
        : radius === 'm'
        ? '12px'
        : radius === 's'
        ? '8px '
        : '5px'};
    object-fit: cover;
  }
`;

const ImageTests = ({ src, name, width, height, radius }) => {
  return (
    <ImageStyled width={width} height={height} radius={radius}>
      <img src={src} alt={name} />
    </ImageStyled>
  );
};
export default ImageTests;
