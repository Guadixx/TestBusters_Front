import './DayTest.css';

import React, { useEffect, useState } from 'react';

import TestCard from '../components/TestCard';
import { API } from '../services/API';
import { Heading_2 } from '../ui/Headings';

const RandomTest = () => {
  const [test, setTest] = useState(undefined);
  const [random, SetRandom] = useState(true);
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    setLoaded(true);
    const type = random ? 'featuredTests' : 'generictests';
    API.get(`/${type}/random`)
      .then((res) => {
        if (res.status == 200) {
          setTest(res.data);
          setLoaded(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [random]);

  return (
    <div className="daytest-div">
      <div className="daytest-header">
        <Heading_2 text="RANDOM TEST" weigth="800" size="2.8vw" />
        <button
          disabled={loaded}
          onClick={() => {
            SetRandom(!random);
          }}
          className="random-btn"
        >
          <img
            src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680106467/shuffle_1_sawcug.png"
            alt="random img"
          />
          Get Random
        </button>
      </div>

      {test != undefined ? <TestCard test={test} /> : <h3>Loading...</h3>}
    </div>
  );
};

export default RandomTest;
