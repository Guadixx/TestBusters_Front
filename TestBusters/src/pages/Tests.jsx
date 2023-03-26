import './Tests.css';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import TestCard from '../components/TestCard';
import { API } from '../services/API';
import Palette from '../styles/Palette';
import Button from '../ui/Button';
//import { Heading_3 } from '../ui/Headings';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [filterTests, setFilterTests] = useState([]);
  const [typeTest, setTypeTest] = useState('featuredtests');
  //const [currentTypeTest, setCurrentTypeTest] = useState('featuredtests');
  const [disable, setDisable] = useState(false);
  const debounceValue = useDebounce(filterTests, 500);
  const [params, setParams] = useState({
    limit: 20,
    order: 'times_played',
    title: '',
    page: 1,
    mode: 1,
  });

  const getTest = () => {
    setDisable(true);
    API.get(`/${typeTest}`, {
      params: params,
    })
      .then((response) => {
        setTests(response.data.results);
        setFilterTests(response.data.results);
        setDisable(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getTest();
  }, [typeTest]);

  /*  useEffect(() => {
    if (typeTest != currentTypeTest) {
      getTest();
      setCurrentTypeTest(typeTest);
    } else {
      return;
    }
  }, [typeTest]); */
  const filterData = (find) => {
    const filter = tests.filter((question) =>
      question.title.toLowerCase().includes(find.toLowerCase()),
    );
    setFilterTests(filter);
    setParams((prevState) => ({
      ...prevState,
      title: find,
    }));
  };
  return (
    <div className="home">
      {/*  <input type="text" onChange={(ev) => filterData(ev.target.value)} />
      <Button
        fixed_width={'100px'}
        textAfter="featuredTest"
        size="4"
        margin={'10px'}
        background={Palette.color_bg}
        variant="border"
        mode={disable}
        action={() => {
          setTypeTest('featuredtests');
        }}
      />
      <Button
        fixed_width={'100px'}
        textAfter="generictests"
        size="4"
        margin={'10px'}
        background={Palette.color_bg}
        variant="border"
        mode={disable}
        action={() => {
          setTypeTest('generictests');
        }}
      />
      <Heading_3 text="ORDER" weigth="600" size="16px" />
      <div className="order-random">
        <input type="radio" id="creator" name="order" value="Creator" />
        <label htmlFor="random">Creator</label>
      </div>
      <div className="order-random">
        <input type="radio" id="times_played" name="order" value="Times_played" />
        <label htmlFor="normal">Times played</label>
      </div>
      <div className="order-random">
        <input type="radio" id="random" name="order" value="Random" />
        <label htmlFor="random">Random</label>
      </div>
      {debounceValue.length != 0 ? (
        debounceValue.map((test) => <TestCard test={test} key={test._id} />)
      ) : (
        <div></div>
      )} */}
    </div>
  );
};

export default Tests;
