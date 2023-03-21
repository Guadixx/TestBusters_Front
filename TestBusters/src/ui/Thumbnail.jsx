import styled from 'styled-components';

const ThumbnailStyled = styled.div`
  & img {
    width: ${({ size }) =>
      size === 'xl' ? '14rem' : size === 'm' ? '12rem' : size === 's' ? '9rem ' : '6rem'};
    border-radius: 1rem;
    object-fit: cover;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  }
`;

const Thumbnail = ({ src, name }) => {
  return (
    <ThumbnailStyled>
      <img src={src} alt={name} />
    </ThumbnailStyled>
  );
};
export default Thumbnail;