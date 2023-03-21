import styled from 'styled-components';

const ImageStyled = styled.div`
  & img {
    height: 18rem;
    width: 22rem;
    border-radius: 2rem;
    object-fit: cover;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  }
`;

const Image = ({ src = ' ', name = ' ' }) => {
  return (
    <ImageStyled>
      <img src={src} alt={name} />
    </ImageStyled>
  );
};
export default Image;
