import { useState } from 'react';
import styled from 'styled-components';

const RatingStyled = styled.div`
  display: flex;
`;

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

const Rating = ({ width, height }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  return (
    <RatingStyled>
      {stars.map((star) => {
        return (
          <RatingButton
            key={star}
            className={star <= hover ? 'on' : 'off'}
            onClick={() => setRating(star)}
            onMouseEnter={() => {
              setHover(star);
            }}
            onMouseLeave={() => setHover(rating)}
          >
            <RatingStar width={width} height={height} />
          </RatingButton>
        );
      })}
    </RatingStyled>
  );
};

export default Rating;
