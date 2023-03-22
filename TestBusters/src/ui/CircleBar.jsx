import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Palette from '../styles/Palette';
import { Spacing } from '../styles/Spacing';
import { Heading_3, Heading_4 } from './Headings';

const CircleBarStyled = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  /*   margin-top: 8vh;
  margin-left: 20vw; */
  display: flex;
  flex-direction: column;
  gap: ${Spacing._1};
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${({ deg, label, range }) =>
    label == 'LEVEL'
      ? `conic-gradient(${Palette.color_highlight_primary} ${
          deg * range
        }deg, #ffffff 0deg)`
      : `conic-gradient(${Palette.color_highlight_primary} ${
          deg * 3.6
        }deg, #ffffff 0deg)`};
`;
const CircleInside = styled.div`
  background-color: #ffffff;
  height: 125px;
  width: 125px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CircleBar = ({ value, label, level = '' }) => {
  //next_level = level[0] * (70 * level[0]) + 100;
  //(minMax * 100) / maxMax
  const nextLevelPoints = level * (70 * level) + 100;
  const nextLevel = `${value}/${nextLevelPoints}`;
  const prevLevelPoints = level != 0 ? (level - 1) * (70 * (level - 1)) + 100 : 0;
  const range = 360 / (nextLevelPoints - prevLevelPoints);
  const [animatedValue, setAnimatedValue] = useState(0);
  const increment = label == 'LEVEL' ? 4 : 0.25;
  let timeoutValue = label == 'LEVEL' ? 2 : 1;
  const incrementAnimatedValue = useCallback(() => {
    setAnimatedValue((prevAnimatedValue) => prevAnimatedValue + increment);
  }, []);
  useEffect(() => {
    if (label == 'LEVEL' && animatedValue >= value - prevLevelPoints) {
      return;
    }
    if (animatedValue >= value) {
      return;
    }
    if (animatedValue >= value - 10) {
      timeoutValue = timeoutValue + 8;
    }
    if (animatedValue >= value - 4) {
      timeoutValue = timeoutValue + 16;
    }
    const timeoutAnimatedValue = setInterval(incrementAnimatedValue, timeoutValue);
    return () => {
      clearInterval(timeoutAnimatedValue);
    };
  }, [incrementAnimatedValue, animatedValue]);
  return (
    <CircleBarStyled
      value={value}
      level={level}
      label={label}
      deg={animatedValue}
      range={range}
    >
      {label == 'BETTER THAN' && <Heading_3 text={label} size={Spacing._5} z={1} />}
      {label == 'BETTER THAN' ? (
        <Heading_3 text={`${Math.floor(animatedValue)}%`} size="65px" z={1} />
      ) : (
        <Heading_3 text={level} size="45px" z={1} weigth="500" />
      )}
      {label == 'LEVEL' && <Heading_4 text={label} z={1} size="16px" weigth="600" />}
      {label == 'LEVEL' && <Heading_4 text={nextLevel} z={1} size="10px" weigth="500" />}
      <CircleInside />
    </CircleBarStyled>
  );
};
export default CircleBar;
/* 
  const average = 78;
  const level = 6;
  const currentPoints = 2100; 


  <CircleBar value={average} label="BETTER THAN" />
  <CircleBar value={currentPoints} level={level} label="LEVEL" />


NEXT LEVEL/CURRENT LEVEL
100 0
170 1 
380 2 
730 3
1220 4
1850 5
2620 6
3530 7
4580 8
5770 9
7100 10
8570 11
10180 12
11930 13
13820 14
15850 15
18020 16
20330 17
22780 18
25370 19
28100 20
30970 21
33980 22
37130 23
40420 24
43850 25
47420 26
51130 27
54980 28
58970 29
63100 30
67370 31
71780 32
76330 33
81020 34
85850 35
90820 36
95930 37
101180 38
106570 39
112100 40
117770 41
123580 42
129530 43
135620 44
141850 45
148220 46
154730 47
161380 48
168170 49
175100 50
      */
