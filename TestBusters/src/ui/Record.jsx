import React from 'react';
import styled from 'styled-components';

import { Spacing } from '../styles/Spacing';
const RecordStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-radius: 5px;
  margin-bottom: 5px;

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
  width: 35px;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 20%;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-left: 15px;
  margin-bottom: ${Spacing._1};
  display: flex;
`;

const Score = styled.div`
  font-size: 1rem;
  width: 110px;
`;

const Time = styled.div`
  font-size: 1rem;
  padding-left: 10px;
  width: 120px;
`;

const Record = ({ position, thumbnail, name, score, time }) => {
  return (
    <RecordStyled>
      <Position>{position}</Position>
      <Thumbnail src={thumbnail} alt="thumbnail" />
      <div>
        <Name>{name}</Name>
        <div className="score">
          <Score>Score: {score}</Score>
          <Time>Time: {time}</Time>
        </div>
      </div>
    </RecordStyled>
  );
};

export default Record;
