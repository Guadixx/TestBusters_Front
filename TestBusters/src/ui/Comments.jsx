import React, { useState } from 'react';
import styled from 'styled-components';

import Icons from '../styles/Icons';
import Palette from '../styles/Palette';
import EmojiButton from '../ui/Emoji';
import Button from './Button';
import { Heading_3, Heading_4 } from './Headings';

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
  & .hidden {
    display: none !important;
  }
  & .delete-test {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 35%;
    padding: 2rem;
    gap: 2rem;
    border-radius: 10px;
    background-color: ${Palette.color_bg};
    animation-name: vibrar;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  }
  & .modal {
    background-color: #cccccba7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  & .delete-test-buttons {
    display: flex;
  }
  @keyframes vibrar {
    0% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
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
  const [modal, setModal] = useState(false);
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
        <button
          className="button-close-comment"
          onClick={() => {
            setModal(true);
          }}
        >
          <img src={Icons.delete} alt="delete icon" />
        </button>
      ) : (
        <div></div>
      )}
      <div className={modal ? 'modal' : 'hidden'}>
        <div className="delete-test">
          <Heading_3
            text="Are you sure to delete the comment?"
            size="22px"
            weigth="600"
          />
          <Heading_4 text="You won't be able to undo this action." size="14px" />
          <div className="delete-test-buttons">
            <Button
              fixed_width={'90px'}
              fixed_height={'30px'}
              background={Palette.color_highlight_primary}
              color={Palette.color_bg}
              textBefore="Cancel"
              size="4"
              action={() => {
                setModal(false);
              }}
            />
            <Button
              fixed_width={'90px'}
              fixed_height={'30px'}
              variant="border"
              background="transparent"
              color={Palette.color_primary}
              textBefore="Delete"
              size="4"
              action={action}
              className="button-delete-comment"
            />
          </div>
        </div>
      </div>
    </CommentsStyled>
  );
};

export default Comment;
