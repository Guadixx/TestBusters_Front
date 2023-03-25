import React, { useEffect, useState } from 'react';

import TestCard from '../components/TestCard';
import API from '../services/API';

const RandomTest = () => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    API.get('featuredTests').then((response) => setTest(response.data));
  }, []);

  const randomIndex = Math.floor(Math.random() * test.length);
  const randomTest = test[randomIndex];

  return (
    <div>
      <>
        {randomTest.map((test) => (
          <TestCard test={test} key={test.id} />
        ))}
      </>
    </div>
  );
};

export default RandomTest;
