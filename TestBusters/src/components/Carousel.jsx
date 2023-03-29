/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './Carousel.css';

import { useEffect, useRef, useState } from 'react';

import Icons from '../styles/Icons';
import CarouselCard from './CarouselCard';

const Carousel = ({ list }) => {
  const [clicked, setClicked] = useState(false);
  const [position, setPosition] = useState(-window.innerWidth / 2);
  const [firstClientXPosition, setFirstClientXPosition] = useState(0);
  const [lastPosition, setLastPosition] = useState(-window.innerWidth / 2);
  const [animation, setAnimation] = useState(false);
  const [loop, setLoop] = useState(false);
  const [lastLoop, setLastLoop] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const div1 = useRef(null);
  const div2 = useRef(null);
  const div3 = useRef(null);
  /*   const [list, setList] = useState([
    '../../bertin.jpeg',
    '../../colacao.jpg',
    '../../descarga1.jpg',
  ]); */

  const [index, setIndex] = useState(() => {
    return Math.floor(list.length / 2);
  });
  const handleMouseDown = (ev) => {
    setLoop(true);
    setAnimation(false);
    setFirstClientXPosition(ev.clientX);
    setClicked(true);
  };
  const handleMouseUp = (ev) => {
    const offset = Math.abs(ev.currentTarget.offsetLeft);
    const _1 = div1.current.offsetLeft;
    const _2 = div2.current.offsetLeft;
    const _3 = div3.current.offsetLeft;
    if (position != _2 * -1) {
      setAnimation(true);
    }
    setPosition(() => {
      return offset <= _2 / 2 ? _1 : offset >= _2 + _2 / 2 ? _3 * -1 : _2 * -1;
    });
    const lastActualized =
      offset <= _2 / 2 ? _1 : offset >= _2 + _2 / 2 ? _3 * -1 : _2 * -1;
    const indexActualized =
      lastActualized == _1 ? index - 1 : lastActualized == _2 * -1 ? index : index + 1;
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
    }, 700);
  };
  const handleMouseMove = (ev) => {
    if (clicked) {
      setPosition(() => {
        return lastPosition + ev.clientX - firstClientXPosition;
      });
    }
  };
  /* ------------------------------------------ */
  const moveLeft = (timeout) => {
    const _2 = div2.current.offsetLeft;
    const _3 = div3.current.offsetLeft;
    setAnimation(true);
    setPosition(_3 * -1);
    const lastActualized = _3 * -1;
    const indexActualized = index + 1;
    setLastPosition(lastActualized);
    setLastLoop(!lastLoop);
    setTimeout(() => {
      if (!clicked) {
        setDisabled(false);
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
            return prevIndex + 1;
          }
        });
        setAnimation(false);
        setPosition(_2 * -1);
        setLastPosition(_2 * -1);
      }
    }, timeout);
  };
  useEffect(() => {
    if (clicked || loop || firstRender) {
      return;
    }
    setDisabled(true);
    setTimeout(() => {
      moveLeft(700);
    }, 3500);
  }, [index, loop, firstRender]);
  useEffect(() => {
    setTimeout(() => {
      setLoop(false);
      setFirstRender(false);
    }, 100);
  }, []);
  useEffect(() => {
    if (loop) {
      setAnimation(false);
      const indexActualized = index - 1;
      setIndex((prevIndex) => {
        if (indexActualized == -1) {
          return list.length - 1;
        }
        if (indexActualized < -1 || indexActualized > list.length) {
          return 0;
        }
        if (prevIndex == list.length - 1 && indexActualized == 0) {
          return 0;
        }
        if (indexActualized == list.length) {
          return 0;
        } else {
          return prevIndex - 1;
        }
      });
    }
  }, [lastLoop]);
  return (
    <div className="hola">
      {loop && (
        <button className="gibraltar" disabled={disabled} onClick={() => setLoop(false)}>
          <img src={Icons.play} alt="play icon" />
        </button>
      )}
      <div
        style={{ left: `${position}px` }}
        className={animation ? 'divcar animation' : 'divcar'}
        onMouseDown={(ev) => {
          handleMouseDown(ev);
        }}
        onMouseUp={(ev) => {
          handleMouseUp(ev);
        }}
        onMouseLeave={(ev) => {
          if (clicked) {
            handleMouseUp(ev);
          }
        }}
        onMouseMove={(ev) => {
          handleMouseMove(ev);
        }}
      >
        <div className="aruba aruba1" ref={div1}>
          <CarouselCard
            test={index == 0 ? list[list.length - 1] : list[index - 1]}
            loop={loop}
          />
          {/* <img
            src={index == 0 ? list[list.length - 1].banner : list[index - 1].banner}
            alt="a saber"
          />
          <h2>{index == 0 ? list[list.length - 1].title : list[index - 1].title}</h2> 
          <h1>{index == 0 ? list[list.length - 1] : list[index - 1]}</h1> */}
        </div>
        <div className="aruba aruba2" ref={div2}>
          <CarouselCard test={list[index]} loop={loop} />
          {/* <img src={list[index].banner} alt="sdfd" />
          <h2>{list[index].title}</h2>
          <h1>{list[index]}</h1> */}
        </div>
        <div className="aruba aruba3" ref={div3}>
          <CarouselCard
            test={index == list.length - 1 ? list[0] : list[index + 1]}
            loop={loop}
          />
          {/* <img
            src={index == list.length - 1 ? list[0].banner : list[index + 1].banner}
            alt="ala"
          />
          <h2>{index == list.length - 1 ? list[0].title : list[index + 1].title}</h2> 
          <h1>{index == list.length - 1 ? list[0] : list[index + 1]}</h1> */}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
