import React from 'react';
import styled from 'styled-components';

import Icons from '../styles/Icons';
import Palette from '../styles/Palette';
import EmojiButton from '../ui/Emoji';
const CommentsStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  & .date {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
  & .avatar {
    display: flex;
    width: 100%;
  }

  & .comment-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  & .button-close-comment {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    justify-self: end;
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
  object-fit: cover;
`;

const Name = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  padding-left: 20px;
  display: flex;
`;

const Date = styled.div`
  font-size: 14px;
  margin-top: 2px;
  color: ${Palette.color_secundary};
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
        <div className="comment-content">
          <div className="date">
            <Name>{name}</Name>
            <Date>{date}</Date>
          </div>
          <Content>{content}</Content>
          <EmojiButton comment={comment} user={user} />
        </div>
      </div>
      {comment.user._id == user._id || user.admin ? (
        <button onClick={action} className="button-close-comment">
          <img src={Icons.delete} alt="delete icon" />
        </button>
      ) : (
        <div></div>
      )}
    </CommentsStyled>
  );
};

export default Comment;
