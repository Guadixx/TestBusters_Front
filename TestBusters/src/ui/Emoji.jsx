import React, { useState } from 'react';
import styled from 'styled-components';

import { API } from '../services/API';
import Icons from '../styles/Icons';
const EmojiStyled = styled.div`
  display: flex;
  position: relative;
  & .modal-emojis {
    position: absolute;
    border-radius: 5px;
    gap: 0.3rem;
    background-color: var(--color-bg);
    height: 44px;
    bottom: -40px;
    left: 15px;
    display: flex;
    border: 1px solid #ccc;
    flex-direction: row;
    z-index: 1;
  }
  & .modal-emojis > button {
    border-radius: 2px;
    font-size: 20px;
    background: none;
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    background-color: '#e0e0e00';
    :hover {
      transform: scale(1.2);
      transition: all 0.2s ease-in-out;
    }
  }
  & .result-emojis {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  & .modal-emojis img {
    width: 32px;
    padding: 5px;
    filter: brightness(95%);
  }
  & .result-emojis > div > button {
    border-radius: 5px;
    padding: 2px 6px 2px 3px;
    font-size: 15px;
    background: none;
    position: relative;
    border: 1px solid #ccc;
    gap: 2px;
    display: flex;
    align-items: center;
  }
  & .result-emojis img {
    width: 32px;
    padding: 5px;
    filter: brightness(95%);
  }
  & .like-main-button-emoji {
    width: 32px;
    padding: 5px;
    margin-left: 0.7rem;
    display: flex;
    align-items: center;
  }
`;

const ButtonStyled = styled.button`
  border-radius: 2px;
  font-size: 20px;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
    transition: all 0.2s ease-in-out;
  }
`;

const EmojiButton = ({ comment, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tearNum, setTearNum] = useState(comment.tear.length);
  const [handsNum, setHandsNum] = useState(comment.hands.length);
  const [heartsNum, setHeartsNum] = useState(comment.hearts.length);
  const [likesNum, setLikesNum] = useState(comment.likes.length);
  const [userReactions, setUserReactions] = useState({
    tear: comment.tear.includes(user._id) ? true : false,
    hands: comment.hands.includes(user._id) ? true : false,
    hearts: comment.hearts.includes(user._id) ? true : false,
    likes: comment.likes.includes(user._id) ? true : false,
  });
  const [disabled, setDisabled] = useState(false);
  const handleMouseEnter = () => {
    setIsModalOpen(true);
  };
  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };
  const uptateReactions = (type) => {
    API.put(`/comments/reactions/${comment._id}`, { userId: user._id, reaction: type })
      .then((res) => {
        if (res.status == 200) {
          setDisabled(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleReaction = (type) => {
    setDisabled(true);
    uptateReactions(type);
    if (type == 'tear') {
      if (userReactions.tear) {
        setTearNum(tearNum - 1);
        setUserReactions({ ...userReactions, tear: false });
      } else {
        setTearNum(tearNum + 1);
        setUserReactions({ ...userReactions, tear: true });
      }
    }
    if (type == 'hands') {
      if (userReactions.hands) {
        setHandsNum(handsNum - 1);
        setUserReactions({ ...userReactions, hands: false });
      } else {
        setHandsNum(handsNum + 1);
        setUserReactions({ ...userReactions, hands: true });
      }
    }
    if (type == 'hearts') {
      if (userReactions.hearts) {
        setHeartsNum(heartsNum - 1);
        setUserReactions({ ...userReactions, hearts: false });
      } else {
        setHeartsNum(heartsNum + 1);
        setUserReactions({ ...userReactions, hearts: true });
      }
    }
    if (type == 'likes') {
      if (userReactions.likes) {
        setLikesNum(likesNum - 1);
        setUserReactions({ ...userReactions, likes: false });
      } else {
        setLikesNum(likesNum + 1);
        setUserReactions({ ...userReactions, likes: true });
      }
    }

    setIsModalOpen(false);
  };
  return (
    <EmojiStyled>
      <ButtonStyled onMouseEnter={handleMouseEnter}>
        <img src={Icons.likes} alt="like emoji" className="like-main-button-emoji" />
      </ButtonStyled>
      {isModalOpen && (
        <div className="modal-emojis" onMouseLeave={handleMouseLeave}>
          <button disabled={disabled} onClick={() => handleReaction('tear')}>
            <img src={Icons.tear} alt="laugh emoji" />
          </button>
          <button disabled={disabled} onClick={() => handleReaction('hands')}>
            <img src={Icons.hands} alt="hands emoji" />
          </button>
          <button disabled={disabled} onClick={() => handleReaction('hearts')}>
            <img src={Icons.hearts} alt="heart emoji" />
          </button>
          <button disabled={disabled} onClick={() => handleReaction('likes')}>
            <img src={Icons.likes} alt="like emoji" />
          </button>
        </div>
      )}
      <div className="result-emojis">
        <div>
          {tearNum < 1 ? (
            <div></div>
          ) : (
            <button disabled={disabled} onClick={() => handleReaction('tear')}>
              <img src={Icons.tear} alt="laugh emoji" />
              {tearNum}
            </button>
          )}
        </div>
        <div>
          {handsNum < 1 ? (
            <div></div>
          ) : (
            <button disabled={disabled} onClick={() => handleReaction('hands')}>
              <img src={Icons.hands} alt="hands emoji" />
              {handsNum}
            </button>
          )}
        </div>
        <div>
          {heartsNum < 1 ? (
            <div></div>
          ) : (
            <button disabled={disabled} onClick={() => handleReaction('hearts')}>
              <img src={Icons.hearts} alt="heart emoji" />
              {heartsNum}
            </button>
          )}
        </div>
        <div>
          {likesNum < 1 ? (
            <div></div>
          ) : (
            <button disabled={disabled} onClick={() => handleReaction('likes')}>
              <img src={Icons.likes} alt="like emoji" />
              {likesNum}
            </button>
          )}
        </div>
      </div>
    </EmojiStyled>
  );
};

export default EmojiButton;
