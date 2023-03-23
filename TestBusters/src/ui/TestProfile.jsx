import styled from 'styled-components';

import Palette from '../styles/Palette';
import { Spacing } from '../styles/Spacing';
import Button from '../ui/Button';
import { Heading_3 } from '../ui/Headings';
import RatingStatic from '../ui/RatingStatic';
import Thumbnail from '../ui/Thumbnail';

const TestProfileStyled = styled.div`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  box-shadow: rgba(154, 157, 160, 0.3) 0px 0px 2px 0px,
    rgba(174, 178, 180, 0.15) 0px 1px 2px 1px;
  display: flex;
  align-items: center;
  gap: ${Spacing._4};
`;

const TestProfileFirst = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const TestProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing._2};
`;

const TestProfile = ({ testcreator, testtitle, rating, thumbnail }) => {
  return (
    <TestProfileStyled>
      <Thumbnail src={thumbnail} alt="test thumbnail" width="s" height="s" />
      <TestProfileFirst>
        <TestProfileInfo>
          <Heading_3 text={testtitle} weigth="600" />
          <Heading_3 text={testcreator} color={Palette.color_secundary} size="14px" />
        </TestProfileInfo>
        <RatingStatic rating={rating} width="18px" height="18px" />
      </TestProfileFirst>
      <Button
        textBefore="Details"
        color={Palette.color_secundary}
        size="3"
        margin=" 0 0 0 0.5rem"
      />
    </TestProfileStyled>
  );
};

export default TestProfile;
