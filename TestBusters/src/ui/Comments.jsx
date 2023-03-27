import React from 'react';
import styled from 'styled-components';

import Icons from '../styles/Icons';
import EmojiButton from '../ui/Emoji';
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
  & .button-close-comment {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
  }
  & .button-close-comment img {
    width: 25px;
    filter: opacity(50%);
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
const Content = styled.div`
  text-align: left;
  width: 500px;
  padding-left: 20px;
`;
const Comment = ({ comment, user, avatar, name, date, content, action }) => {
  return (
    <CommentsStyled>
      <div className="avatar">
        <Avatar src={avatar} alt="avatar" />
        <div>
          <div className="date">
            <Name>{name}</Name>
            <Date>{date}</Date>
          </div>
          <Content>{content}</Content>
          <EmojiButton comment={comment} user={user} />
        </div>
        {comment.user._id == user._id ? (
          <button onClick={action} className="button-close-comment">
            <img src={Icons.delete} alt="delete icon" />
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </CommentsStyled>
  );
};

export default Comment;
