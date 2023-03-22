import React from 'react';
import styled from 'styled-components';

const Record = ({ position, thumbnail, name, score, time }) => {
  const RecordStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;

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
    padding: 15px;
  `;

  const Thumbsnail = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 20%;
  `;

  const Name = styled.div`
    font-size: 20px;
    font-weight: bold;
    padding-left: 15px;
    display: flex;
  `;

  const Score = styled.div`
    font-size: 20px;
  `;

  const Time = styled.div`
    font-size: 20px;
    padding-left: 10px;
  `;

  return (
    <RecordStyled>
      <Position>{position}</Position>
      <Thumbsnail src={thumbnail} alt="thumbnail" />
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
