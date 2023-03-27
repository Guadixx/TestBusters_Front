import './Tests.css';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import TestCard from '../components/TestCard';
import { API } from '../services/API';
import { Heading_3 } from '../ui/Headings';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [typeTest, setTypeTest] = useState('featuredtests');
  const [onFocus, setOnFocus] = useState(false);
  const [disable, setDisable] = useState(false);
  const [nextPage, setNextPage] = useState(true);
  const [params, setParams] = useState({
    limit: 9,
    order: '',
    title: '',
    page: 1,
    mode: -1,
  });
  const [debounceValue] = useDebounce(params.title, 500);
  const [loadMessage, setLoadMessage] = useState('Load More');

  const handleDebounce = (ev) => {
    const value = ev.target.value;
    setParams({ ...params, title: value });
  };
  const getTest = () => {
    setDisable(true);
    if (nextPage) {
      API.get(`/${typeTest}`, {
        params: params,
      })
        .then((response) => {
          setDisable(false);
          handleObserver();
          const newTests = [];
          const actualTests = [...tests];
          if (actualTests.length != 0) {
            for (const newtest of response.data.results) {
              console.log(newtest);
              for (const actualtest of actualTests) {
                console.log(actualtest);
                if (newTests._id != actualtest._id) {
                  newTests.push(newtest);
                }
              }
            }
            setTests((prevTests) => [...prevTests, ...newTests]);
          } else {
            setTests(response.data.results);
          }
          if (response.data.info.next === null) {
            setNextPage(false);
            setLoadMessage('No more tests');
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleObserver = () => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setParams({ ...params, page: params.page + 1 });
      }
    });

    observer.observe(document.querySelector('.scroll-target'));

    return () => observer.disconnect();
  };

  useEffect(() => {
    getTest();
  }, [typeTest, params.order, params.mode, debounceValue, params.page]);

  return (
    <div className="tests">
      <h1>Choose a Test!!</h1>
      <div className="tests_input_container">
        <input
          className="input_title"
          type="text"
          placeholder={onFocus ? ' ' : ' '}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          value={params.title}
          onChange={(e) => handleDebounce(e)}
        />
        <label htmlFor="custom_input" className="placeholder_title">
          Search by title
        </label>
      </div>
      <section className="tests-body">
        <div className="tests-filters">
          <div className="test-filters-type">
            <Heading_3 text="TEST TYPE" weigth="600" size="16px" />
            <button
              onClick={() => {
                setTypeTest('featuredtests');
                {
                  typeTest === 'generictests' ? setDisable(true) : setDisable(false);
                }
              }}
              disabled={disable ? true : false}
            >
              Featured Tests
            </button>
            <button
              onClick={() => {
                setTypeTest('generictests');
                {
                  typeTest === 'featuredtests' ? setDisable(true) : setDisable(false);
                }
              }}
              disabled={disable ? true : false}
            >
              Generic Tests
            </button>
          </div>

          <div
            className="tests_order_container"
            onChange={(e) => setParams({ ...params, order: e.target.value })}
          >
            <Heading_3 text="FILTER BY" weigth="600" size="16px" />
            <div className="order-test">
              <input type="radio" id="times_played" name="order" value="times_played" />
              <label htmlFor="times_played">Most Popular</label>
            </div>
            <div className="order-test">
              <input type="radio" id="creator" name="order" value="created" />
              <label htmlFor="creator">Latest</label>
            </div>
            <div className="order-test">
              <input type="radio" id="favorites" name="order" value="favorites" />
              <label htmlFor="favorites">Best Rated</label>
            </div>
          </div>
          <div
            className="tests_order_container"
            onChange={(e) => {
              setParams({ ...params, mode: e.target.value });
            }}
          >
            <Heading_3 text="ORDER" weigth="600" size="16px" />
            <div className="order-test">
              <input type="radio" id="ascending" name="mode" value="-1" />
              <label htmlFor="ascending">Ascending</label>
            </div>
            <div className="order-test">
              <input type="radio" id="descending" name="mode" value="1" />
              <label htmlFor="descending">Descending</label>
            </div>
          </div>
        </div>
        <div className="tests-card-section">
          <div className="tests-cards">
            {tests.length != 0 ? (
              tests.map((test) => <TestCard test={test} key={test._id} />)
            ) : (
              <h1>Loading</h1>
            )}
          </div>
          <h4 className="scroll-target">{loadMessage}</h4>
        </div>
      </section>
    </div>
  );
};

export default Tests;
