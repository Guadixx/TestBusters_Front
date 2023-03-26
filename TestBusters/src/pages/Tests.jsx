import './Tests.css';

import { useEffect, useState } from 'react';

import TestCard from '../components/TestCard';
import { API } from '../services/API';
import Palette from '../styles/Palette';
import Button from '../ui/Button';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [typeTest, setTypeTest] = useState('featuredtests');
  const [params, setParams] = useState({
    limit: 20,
    order: 'times_played',
    title: '',
    page: 1,
    mode: 1,
  });

  const getTest = () => {
    API.get(`/${typeTest}`, {
      params: params,
    })
      .then((response) => {
        setTests(response.data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTest();
  }, []);

  return (
    <div className="home">
      <Button
        fixed_width={'100px'}
        textAfter={typeTest}
        size="4"
        margin={'10px'}
        background={Palette.color_bg}
        variant="border"
        action={() => {
          setTypeTest(typeTest === 'featuredtests' ? 'generictests' : 'featuredtests');
          {
            getTest();
          }
        }}
      />

      {tests.length != 0 ? (
        tests.map((test) => <TestCard test={test} key={test._id} />)
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Tests;
