import './Tests.css';

import { useEffect, useState } from 'react';

//import { useDebounce } from 'use-debounce';
import TestCard from '../components/TestCard';
import { API } from '../services/API';
import Palette from '../styles/Palette';
import Button from '../ui/Button';
import { Heading_3 } from '../ui/Headings';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [typeTest, setTypeTest] = useState('featuredtests');
  //const debounceValue = useDebounce(filterTests, 500);
  const [onFocus, setOnFocus] = useState(false);
  const [disable, setDisable] = useState(false);
  const [params, setParams] = useState({
    limit: 20,
    order: '',
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
        setDisable(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getTest();
  }, [typeTest, params]);

  return (
    <div className="home">
      <div className="filters">
        <div className="input_container">
          <input
            className="input_title"
            type="text"
            placeholder={onFocus ? ' ' : ' '}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            value={params.title}
            onInput={(e) => setParams({ ...params, title: e.target.value })}
          />
          <label htmlFor="custom_input" className="placeholder_title">
            Search by title
          </label>
        </div>
        <div className="buttons">
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
        </div>
        <div className="order">
          <Heading_3 text="ORDER" weigth="600" size="16px" />
          <div className="order_container">
            <div className="order-test">
              <input
                type="radio"
                id="creator"
                name="order"
                value="creator"
                onChange={(e) => setParams({ ...params, order: e.target.value })}
              />
              <label htmlFor="test">Creator</label>
            </div>
            <div className="order-test">
              <input
                type="radio"
                id="times_played"
                name="order"
                value="times_played"
                onChange={(e) => setParams({ ...params, order: e.target.value })}
              />
              <label htmlFor="normal">Times played</label>
            </div>
            <div className="order-test">
              <input
                type="radio"
                id="favorites"
                name="order"
                value="favorites"
                onChange={(e) => setParams({ ...params, order: e.target.value })}
              />
              <label htmlFor="test">Favorites</label>
            </div>
          </div>
        </div>
      </div>
      <div className="principal">
        <h1>Choose a Test!!</h1>
        <div className="card">
          {tests.length != 0 ? (
            tests.map((test) => <TestCard test={test} key={test._id} />)
          ) : (
            <div>
              <h1>Loading</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tests;
