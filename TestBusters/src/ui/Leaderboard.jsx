import React from 'react';
import styled from 'styled-components';
const LeaderboardStyled = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;

  &:last-child {
    margin-bottom: 0;
  }
  & .score {
    display: flex;
    padding-left: 15px;
  }
`;

const Position = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 0 15px 0 0;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-left: 15px;
  display: flex;
  margin-bottom: 2px;
`;

const Score = styled.div`
  font-size: 16px;
  padding-right: 0.7rem;
`;

const Time = styled.div`
  font-size: 16px;
`;
const Leaderboard = ({ position, avatar, name, score, time }) => {
  return (
    <LeaderboardStyled>
      <Position>{position}</Position>
      <Avatar src={avatar} alt="avatar" />
      <div>
        <Name>{name}</Name>
        <div className="score">
          <Score>Score: {score}</Score>
          <Time>Time: {time}</Time>
        </div>
      </div>
    </LeaderboardStyled>
  );
};

export default Leaderboard;
