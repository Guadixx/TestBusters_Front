/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './Carousel.css';

import { useRef, useState } from 'react';

const Carousel = () => {
  const [clicked, setClicked] = useState(false);
  const [position, setPosition] = useState(-window.innerWidth);
  const [firstClientXPosition, setFirstClientXPosition] = useState(0);
  const [lastPosition, setLastPosition] = useState(-window.innerWidth);
  const [animation, setAnimation] = useState(false);
  const div1 = useRef(null);
  const div2 = useRef(null);
  const div3 = useRef(null);
  const list = [1, 2, 3, 4, 5];
  const [index, setIndex] = useState(() => {
    return Math.floor(list.length / 2);
  });
  return (
    <div className="hola">
      <div
        style={{ left: `calc(${position}px)` }}
        className={animation ? 'divcar animation' : 'divcar'}
        onMouseDown={(ev) => {
          setAnimation(false);
          setFirstClientXPosition(ev.clientX);
          setClicked(true);
        }}
        onMouseUp={(ev) => {
          setAnimation(true);
          const offset = Math.abs(ev.currentTarget.offsetLeft);
          const _1 = div1.current.offsetLeft;
          const _2 = div2.current.offsetLeft;
          const _3 = div3.current.offsetLeft;
          setPosition(() => {
            return offset <= _2 / 2 ? _1 : offset >= _2 + _2 / 2 ? _3 * -1 : _2 * -1;
          });
          const lastActualized =
            offset <= _2 / 2 ? _1 : offset >= _2 + _2 / 2 ? _3 * -1 : _2 * -1;
          const indexActualized =
            lastActualized == _1
              ? index - 1
              : lastActualized == _2 * -1
              ? index
              : index + 1;
          setLastPosition(lastActualized);
          setClicked(false);
          setTimeout(() => {
            setIndex((prevIndex) => {
              if (indexActualized == -1) {
                return list.length - 1;
              }
              if (prevIndex == list.length - 1 && indexActualized == 0) {
                return 0;
              }
              if (indexActualized == list.length) {
                return 0;
              } else {
                return lastActualized == _1
                  ? prevIndex - 1
                  : lastActualized == _2 * -1
                  ? prevIndex
                  : prevIndex + 1;
              }
            });
            setAnimation(false);
            setPosition(_2 * -1);
            setLastPosition(_2 * -1);
          }, 500);
        }}
        onMouseLeave={(ev) => {
          const offset = Math.abs(ev.currentTarget.offsetLeft);
          const _1 = div1.current.offsetLeft;
          const _2 = div2.current.offsetLeft;
          const _3 = div3.current.offsetLeft;
          setPosition(() => {
            return offset <= _2 / 2 ? _1 : offset >= _2 + _2 / 2 ? _3 * -1 : _2 * -1;
          });
          const lastActualized =
            offset <= _2 / 2 ? _1 : offset >= _2 + _2 / 2 ? _3 * -1 : _2 * -1;
          setIndex((prevIndex) => {
            return lastActualized == _1
              ? prevIndex - 1
              : lastActualized == _2 * -1
              ? prevIndex
              : prevIndex + 1;
          });
          setLastPosition(lastActualized);
          setClicked(false);
          setTimeout(() => {
            setPosition(_2 * -1);
            setLastPosition(_2 * -1);
          }, 10);
        }}
        onMouseMove={(ev) => {
          if (clicked) {
            setPosition(() => {
              return lastPosition + ev.clientX - firstClientXPosition;
            });
          }
        }}
      >
        <div className="aruba aruba1" ref={div1}>
          <h1>{index == 0 ? list[list.length - 1] : list[index - 1]}</h1>
        </div>
        <div className="aruba aruba2" ref={div2}>
          <h1>{list[index]}</h1>
        </div>
        <div className="aruba aruba3" ref={div3}>
          <h1>{index == list.length - 1 ? list[0] : list[index + 1]}</h1>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
