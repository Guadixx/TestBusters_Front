import styled from 'styled-components';

const ThumbnailStyled = styled.div`
  & img {
    width: ${({ width }) =>
      width === 'xl'
        ? '14rem'
        : width === 'l'
        ? '12rem'
        : width === 'm'
        ? '9rem '
        : width === 's'
        ? '4rem '
        : '6rem'};
    height: ${({ height }) =>
      height === 'xl'
        ? '14rem'
        : height === 'l'
        ? '12rem'
        : height === 'm'
        ? '9rem '
        : height === 's'
        ? '4rem '
        : '6rem'};
    border-radius: 1rem;
    object-fit: cover;
    box-shadow: ${({ shadow }) =>
      shadow == 'yes'
        ? 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px'
        : 'none'};
  }
`;

const Thumbnail = ({ src, name, width, height, shadow }) => {
  return (
    <ThumbnailStyled width={width} height={height} shadow={shadow}>
      <img src={src} alt={name} />
    </ThumbnailStyled>
  );
};
export default Thumbnail;
