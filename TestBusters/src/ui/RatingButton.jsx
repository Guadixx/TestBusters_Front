import styled from 'styled-components';

const RatingButton = styled.button`
  border: none;
  background-color: transparent;

  &.on {
    background: url('https://res.cloudinary.com/dva9zee9r/image/upload/v1679484972/achievements%20icons/star_icon_filled_small_bhkc31.svg');
  }
`;

const RatingStar = styled.div`
  width: ${({ width }) => (width ? width : '20px')};
  height: ${({ height }) => (height ? height : '20px')};
  background: url('https://res.cloudinary.com/dva9zee9r/image/upload/v1679484972/achievements%20icons/star_icon_border_smalll_hqeujm.svg');
`;

const RatingStarTest = ({ width, height, rated, action }) => {
  return (
    <RatingButton className={rated ? 'on' : 'off'} onClick={action}>
      <RatingStar width={width} height={height} />
    </RatingButton>
  );
};

export default RatingStarTest;
