import React, { useEffect, useState } from 'react';

import TestCard from '../components/TestCard';
import { API } from '../services/API';

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
    <div>
      {test != undefined ? <TestCard test={test} /> : <h3>Loading...</h3>}
      <button
        disabled={loaded}
        onClick={() => {
          SetRandom(!random);
        }}
      >
        Get Random
      </button>
    </div>
  );
};

export default RandomTest;
