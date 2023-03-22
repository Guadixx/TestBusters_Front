import React from 'react';
import styled from 'styled-components';

const Comment = ({ avatar, name, date, comment }) => {
  const CommentsStyled = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    & .date {
      display: flex;
      gap: 20px;
    }
    & .avatar {
      display: flex;
    }
  `;

  const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
  `;

  const Name = styled.div`
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    padding-left: 20px;
    display: flex;
  `;

  const Date = styled.div`
    font-size: 20px;
  `;
  const Comment = styled.div`
    text-align: left;
    width: 500px;
    padding-left: 20px;
  `;

  return (
    <CommentsStyled>
      <div className="avatar">
        <Avatar src={avatar} alt="avatar" />
        <div>
          <div className="date">
            <Name>{name}</Name>
            <Date>{date}</Date>
          </div>
          <Comment>{comment}</Comment>
        </div>
      </div>
    </CommentsStyled>
  );
};

export default Comment;
