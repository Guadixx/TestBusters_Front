import './Tests.css';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import TestCard from '../components/TestCard';
import { API } from '../services/API';
import { Heading_3 } from '../ui/Headings';
import Spinner from '../ui/Spinner';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [typeTest, setTypeTest] = useState('featuredtests');
  const [onFocus, setOnFocus] = useState(false);
  const [disable, setDisable] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [offSet, setOffset] = useState(0);
  const [params, setParams] = useState({
    limit: 20,
    order: '',
    title: '',
    page: 1,
    mode: -1,
  });
  const [debounceValue] = useDebounce(params.title, 200);

  const handleDebounce = (ev) => {
    const value = ev.target.value;
    setParams({ ...params, title: value });
  };
  const getTest = (actualizedParams) => {
    setLoaded(false);
    setDisable(true);
    API.get(`/${typeTest}`, {
      params: actualizedParams,
    })
      .then((response) => {
        setTests(response.data.results);
        setLoaded(true);
        setDisable(false);
        console.log(response.data.info);
        response.data.info.next === null ? setNextPage(false) : setNextPage(true);
      })
      .catch((error) => console.log(error));
  };
  window.addEventListener('scroll', () => {
    if (nextPage) {
      setOffset(window.scrollY);
    }
  });
  useEffect(() => {
    if (loaded && nextPage && tests.length > 19) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const limit = params.limit + 20;
          setParams({ ...params, limit: limit });
          const actualizedParams = { ...params, limit: limit };
          getTest(actualizedParams);
        }
      });

      observer.observe(document.querySelector('.scroll-target'));
      return () => observer.disconnect();
    }
  }, [offSet]);
  useEffect(() => {
    const actualizedParams = {
      limit: 20,
      order: params.order,
      title: debounceValue,
      page: 1,
      mode: params.mode,
    };
    setParams(actualizedParams);
    getTest(actualizedParams);
  }, [typeTest, params.order, params.mode, debounceValue]);

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
              <label htmlFor="ascending">Latest</label>
            </div>
            <div className="order-test">
              <input type="radio" id="descending" name="mode" value="1" />
              <label htmlFor="descending">Most Popular</label>
            </div>
          </div>
        </div>
        <div className="tests-card-section">
          <div className="tests-cards">
            {tests.length != 0 ? (
              tests.map((test) => <TestCard test={test} key={test._id} />)
            ) : (
              <Spinner />
            )}
          </div>
          {loaded && nextPage && tests.length > 19 ? (
            <h4 className="scroll-target">Load More</h4>
          ) : (
            <div></div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tests;
