import styled from 'styled-components';

import { Spacing } from '../styles/Spacing';
import Button from './Button';
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
  text-align: center;
  max-width: 50vw;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileInfoFollows = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing._4};
  margin-top: 0.2rem;
  & button {
    border: none;
    background-color: transparent;
    font-size: 14px;
  }
`;

const ProfileInfo = ({
  description,
  followers,
  following,
  username,
  level,
  buttonimg,
  buttontext,
  buttonalt,
  action,
  buttonColor,
  buttonBackground,
  action1,
  action2,
}) => {
  return (
    <ProfileInfoStyled>
      <ProfileInfoUser>
        <Heading_3 size="18px" text={username} weigth="800" />
        <Heading_4 size="16px" text={`Level ${level}`} />
      </ProfileInfoUser>
      <ProfileInfoDescription>{description}</ProfileInfoDescription>
      <ProfileInfoFollows>
        <button onClick={action1}>{`Followers ${followers}`}</button>
        <button onClick={action2}>{`Following ${following}`}</button>
      </ProfileInfoFollows>

      <Button
        src={buttonimg}
        alt={buttonalt}
        textAfter={buttontext}
        size="3"
        margin=" 0.3rem 0 0 0 "
        fixed_height="1.5rem"
        background={buttonBackground}
        color={buttonColor}
        action={action}
      />
    </ProfileInfoStyled>
  );
};

export default ProfileInfo;
