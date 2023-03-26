import React from 'react';
import styled from 'styled-components';

import Palette from '../styles/Palette';
import EmojiStyled from '../ui/Emoji';
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
    background-color: '#0000000';
    color: ${Palette.color_highlight_secondary};
    font-weight: 900;
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
const Comment = ({ avatar, name, date, content, action, idUserOnComment, idUser }) => {
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
          <EmojiStyled />
        </div>
        {idUserOnComment == idUser ? (
          <button onClick={action} className="button-close-comment">
            X
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </CommentsStyled>
  );
};

export default Comment;
