import './Tests.css';

import { useEffect, useState } from 'react';

import TestCard from '../components/TestCard';
import { API } from '../services/API';
import Rating from '../ui/Rating';

const Tests = () => {
  const [tests, setTests] = useState([]);
  useEffect(() => {
    API.get('/featuredtests/', {
      params: {
        limit: 20,
        order: 'created',
        title: 'title',
        page: 'page',
        mode: 'mode',
      },
    })
      .then((response) => setTests(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="home">
      <>
        {tests.map((test) => (
          <TestCard test={test} key={test.id} />
        ))}
        <Rating width="25px" height="25px" />
      </>
    </div>
  );
};

export default Tests;
