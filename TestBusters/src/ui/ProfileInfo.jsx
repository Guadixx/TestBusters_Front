import styled from 'styled-components';

import { Spacing } from '../styles/Spacing';
import { Heading_3, Heading_4, Heading_5 } from './Headings';

const ProfileInfoStyled = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spacing._2};
`;

const ProfileInfoUser = styled.div`
  display: flex;
  gap: ${Spacing._4};
  align-items: center;
`;

const ProfileInfoDescription = styled.p`
  font-size: 14px;
`;

const ProfileInfoFollows = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing._4};
  margin-top: 0.2rem;
`;

const ProfileInfo = ({ description, followers, following, username, level }) => {
  return (
    <ProfileInfoStyled>
      <ProfileInfoUser>
        <Heading_3 size="18px" text={username} weigth="800" />
        <Heading_4 size="16px" text={`Level ${level}`} />
      </ProfileInfoUser>
      <ProfileInfoDescription>{description}</ProfileInfoDescription>
      <ProfileInfoFollows>
        <Heading_5 text={`Followers ${followers}`} size="14px" />
        <Heading_5 text={`Following ${following}`} size="14px" />
      </ProfileInfoFollows>
    </ProfileInfoStyled>
  );
};

export default ProfileInfo;
