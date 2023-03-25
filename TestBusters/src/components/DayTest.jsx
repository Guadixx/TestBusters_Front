import React, { useEffect, useState } from 'react';

import TestCard from '../components/TestCard';
import { API } from '../services/API';

const DayTest = () => {
  const [test, setTest] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);

  useEffect(() => {
    API.get('featuredTests').then((response) => setTest(response.data));
  }, []);

  const changeTest = () => {
    const randomIndex = Math.floor(Math.random() * test.length);
    setCurrentTest(test[randomIndex]);
  };

  useEffect(() => {
    changeTest();
    const interval = setInterval(changeTest, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [test]);

  return (
    <div>
      <>
        {currentTest.map((test) => (
          <TestCard test={test} key={test.id} />
        ))}
      </>
    </div>
  );
};

export default DayTest;
