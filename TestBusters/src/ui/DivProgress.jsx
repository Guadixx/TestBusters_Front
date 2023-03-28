import { useCallback, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import Palette from '../styles/Palette';
import { Heading_3 } from './Headings';

const timer = keyframes`
from {
  width: 100%;
}
to {
  width: 0%;
}
`;
const animation = (props) =>
  css`
    animation: ${timer} ${props.maxValue + 0.3}s linear;
  `;
const ProgressBarStyled = styled.div`
  background-color: ${Palette.color_highlight_secondary};
  height: ${({ height }) => (height ? `${height - 3}px` : '21px')};
  width: ${({ width, type, range }) =>
    type != 'CountDown' ? `${width * range + 0.5}%` : '100%'};
  border-radius: 15px;
  position: absolute;
  left: -1px;
  top: -1px;
  &.timer {
    ${animation};
  }
`;
const ProgressTrackStyled = styled.div`
  background-color: #ffffff;
  height: ${({ heighta }) => (heighta ? `${heighta - 3}px` : '24px')};
  width: ${({ widtha }) => (widtha ? widtha : '600px')};
  border-radius: 15px;
  position: absolute;
  border: 3px solid ${Palette.color_highlight_secondary};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const DivProgressStyled = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  height: min-content;
  width: ${({ widthb }) => (widthb ? widthb : '800px')};
`;
const DivProgress = ({
  widtha,
  widthb,
  heighta,
  height,
  type,
  text1 = '',
  value = 0,
  maxValue,
  className,
  marginright,
}) => {
  const [animatedWidth, setanimatedWidth] = useState(() => {
    return type == 'CountDown' ? maxValue : 0;
  });
  const [minutes, setMinutes] = useState(() => {
    return Math.floor(maxValue / 15);
  });
  const [seconds, setSeconds] = useState(() => {
    return Math.round((maxValue / 60 - Math.floor(maxValue / 60)) * 60);
  });
  const totalMinutes =
    Math.floor(maxValue / 60) >= 10
      ? Math.floor(maxValue / 60)
      : `0${Math.floor(maxValue / 60)}`;
  const totalSeconds =
    Math.round((maxValue / 60 - Math.floor(maxValue / 60)) * 60) >= 10
      ? Math.round((maxValue / 60 - Math.floor(maxValue / 60)) * 60)
      : `0${Math.round((maxValue / 60 - Math.floor(maxValue / 60)) * 60)}`;
  const increment = type == 'CountDown' ? 1 : 2.5;
  let timeoutValue = type == 'CountDown' ? 1000 : 1;
  const incrementAnimatedWidth = useCallback(() => {
    setanimatedWidth((prevWidth) =>
      type == 'CountDown' ? prevWidth - increment : prevWidth + increment,
    );
  }, []);
  useEffect(() => {
    setMinutes(() => {
      return Math.floor(animatedWidth / 60) >= 10
        ? Math.floor(animatedWidth / 60)
        : `0${Math.floor(animatedWidth / 60)}`;
    });
    setSeconds(() => {
      return Math.round((animatedWidth / 60 - Math.floor(animatedWidth / 60)) * 60) >= 10
        ? Math.round((animatedWidth / 60 - Math.floor(animatedWidth / 60)) * 60)
        : `0${Math.round((animatedWidth / 60 - Math.floor(animatedWidth / 60)) * 60)}`;
    });
  }, [animatedWidth]);
  useEffect(() => {
    if (animatedWidth >= value && type != 'CountDown') {
      setanimatedWidth(value);
      return;
    }
    if (animatedWidth == value && type == 'CountDown') {
      return;
    }
    if (animatedWidth >= value - 10 && type != 'CountDown') {
      timeoutValue = timeoutValue + 20;
    }
    if (animatedWidth >= value - 4 && type != 'CountDown') {
      timeoutValue = timeoutValue + 20;
    }
    const timeoutAnimatedWidth = setInterval(incrementAnimatedWidth, timeoutValue);
    return () => {
      clearInterval(timeoutAnimatedWidth);
    };
  }, [incrementAnimatedWidth, animatedWidth]);
  const range = 100 / maxValue;
  return (
    <DivProgressStyled
      widtha={widtha}
      height={height}
      heighta={heighta}
      widthb={widthb}
      text1={text1}
      type={type}
      value={value}
      maxValue={maxValue}
    >
      <Heading_3 text={text1} size="14px" marginleft="1.5rem" />
      <ProgressTrackStyled heighta={heighta} widtha={widtha}>
        {animatedWidth != 0 && (
          <ProgressBarStyled
            height={height}
            width={animatedWidth}
            className={className}
            maxValue={maxValue}
            range={range}
          />
        )}
      </ProgressTrackStyled>
      <Heading_3
        marginright={marginright}
        size="14px"
        text={
          type == 'CountDown'
            ? `${minutes}:${seconds}`
            : type == 'time'
            ? `${minutes}:${seconds}/${totalMinutes}:${totalSeconds}`
            : `${Math.ceil(animatedWidth)}/${maxValue}`
        }
      />
    </DivProgressStyled>
  );
};
export default DivProgress;

/* 
<DivProgress value={251} text1="score" type="score" maxValue={500} />
<DivProgress value={120} text1="time" type="time" maxValue={500} />
<DivProgress type="CountDown" maxValue={30} className="timer" /> */
