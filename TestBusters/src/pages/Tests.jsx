import './Tests.css';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import FilterTest from '../components/FilterTest/FilterTest';
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
  const [info, setInfo] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [pagesButtons, setPagesButtons] = useState([]);
  //const [offSet, setOffset] = useState(0);
  const [params, setParams] = useState({
    limit: window.innerWidth > 1250 && window.innerWidth < 1611 ? 15 : 16,
    order: '',
    title: '',
    page: 1,
    mode: -1,
  });
  const [debounceValue] = useDebounce(params.title, 200);
  const handleDebounce = (ev) => {
    const value = ev.target.value;
    setParams({ ...params, title: value, page: 1 });
  };
  const getTest = () => {
    setLoaded(false);
    setDisable(true);
    API.get(`/${typeTest}`, {
      params: params,
    })
      .then((response) => {
        setInfo(response.data.info);
        let acc = 1;
        const pagesButtonsList = [];
        while (acc < response.data.info.totalpages + 1) {
          pagesButtonsList.push(acc);
          acc++;
        }
        setPagesButtons(pagesButtonsList);
        setTests(response.data.results);
        setLoaded(true);
        setDisable(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        response.data.info.next === null ? setNextPage(false) : setNextPage(true);
      })
      .catch((error) => console.log(error));
  };
  /* window.addEventListener('scroll', () => {
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
  }, [offSet]); */
  useEffect(() => {
    getTest();
  }, [typeTest, params.order, params.mode, debounceValue, params.page]);
  const goToPage = (numPage) => {
    if (params.page != numPage) {
      setParams({ ...params, page: numPage });
    }
  };
  const showFilterToggle = () => {
    setShowFilter(!showFilter);
  };
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

        <button className="test-hamburger" onClick={() => showFilterToggle()}>
          <img
            src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679671423/achievements%20icons/customize_dbbv2c.png"
            alt="menu icon"
          />
        </button>
      </div>
      <section className="tests-body">
        <div className="tests-filters">
          <div className="test-filters-type">
            <Heading_3 text="TEST TYPE" weigth="600" size="16px" />
            <button
              onClick={() => {
                setTypeTest('featuredtests');
                setParams({ ...params, page: 1 });
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
                setParams({ ...params, page: 1 });
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
            onChange={(e) => setParams({ ...params, order: e.target.value, page: 1 })}
          >
            <Heading_3 text="FILTER BY" weigth="600" size="16px" />
            <div className="order-test">
              <input
                type="radio"
                id="times_played"
                name="order"
                value="times_played"
                defaultChecked
              />
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
              setParams({ ...params, mode: e.target.value, page: 1 });
            }}
          >
            <Heading_3 text="ORDER" weigth="600" size="16px" />
            <div className="order-test">
              <input type="radio" id="ascending" name="mode" value="-1" defaultChecked />
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
              <div className="placeholder-spinner-tests">
                <Spinner />
              </div>
            )}
          </div>
          {(tests.length > params.limit - 1 || params.page != 1) &&
          info.totalpages > 5 ? (
            <div className="pagination-test-buttons">
              <button
                disabled={!loaded}
                onClick={() => {
                  if (params.page != 1) {
                    const page = params.page - 1;
                    setParams({ ...params, page: page });
                  }
                }}
                className={
                  params.page != 1
                    ? 'test-page-button-page'
                    : 'test-page-button-page test-page-button-page-disabled'
                }
              >
                Prev
              </button>

              <div className="nav-pagination-specific-page">
                {info.totalpages > 3 && params.page > 3 ? (
                  <button className="button-go-specific-page" onClick={() => goToPage(1)}>
                    <h4>1</h4>
                  </button>
                ) : (
                  <div></div>
                )}
                {info.totalpages > 3 && params.page > 3 ? (
                  <h5 className="more-nav-buttons-pages">...</h5>
                ) : (
                  <div></div>
                )}
                {params.page - 2 > 0 ? (
                  <button
                    className="button-go-specific-page"
                    onClick={() => goToPage(params.page - 2)}
                  >
                    <h4>{params.page - 2}</h4>
                  </button>
                ) : (
                  <div></div>
                )}
                {params.page - 1 ? (
                  <button
                    className="button-go-specific-page"
                    onClick={() => goToPage(params.page - 1)}
                  >
                    <h4>{params.page - 1}</h4>
                  </button>
                ) : (
                  <div></div>
                )}
                <button className="button-go-specific-page actual-page-nav-buttons">
                  <h4>{params.page}</h4>
                </button>
                {info.totalpages > params.page ? (
                  <button
                    className="button-go-specific-page"
                    onClick={() => goToPage(params.page + 1)}
                  >
                    <h4>{params.page + 1}</h4>
                  </button>
                ) : (
                  <div></div>
                )}
                {info.totalpages > params.page + 1 ? (
                  <button
                    className="button-go-specific-page"
                    onClick={() => goToPage(params.page + 2)}
                  >
                    <h4>{params.page + 2}</h4>
                  </button>
                ) : (
                  <div></div>
                )}
                {info.totalpages > 3 && info.totalpages - params.page > 2 ? (
                  <h5 className="more-nav-buttons-pages">...</h5>
                ) : (
                  <div></div>
                )}
                {info.totalpages > 3 && info.totalpages - params.page > 2 ? (
                  <button
                    className="button-go-specific-page"
                    onClick={() => goToPage(info.totalpages)}
                  >
                    <h4>{info.totalpages}</h4>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
              <button
                disabled={!loaded}
                onClick={() => {
                  if (nextPage) {
                    const page = params.page + 1;
                    setParams({ ...params, page: page });
                  }
                }}
                className={
                  nextPage
                    ? 'test-page-button-page'
                    : 'test-page-button-page test-page-button-page-disabled'
                }
              >
                Next
              </button>
            </div>
          ) : (tests.length > params.limit - 1 || params.page != 1) &&
            info.totalpages < 5 ? (
            <div className="pagination-test-buttons">
              <button
                disabled={!loaded}
                onClick={() => {
                  if (params.page != 1) {
                    const page = params.page - 1;
                    setParams({ ...params, page: page });
                  }
                }}
                className={
                  params.page != 1
                    ? 'test-page-button-page'
                    : 'test-page-button-page test-page-button-page-disabled'
                }
              >
                Prev
              </button>
              <div className="nav-pagination-specific-page">
                {pagesButtons.map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={
                      params.page == page
                        ? 'button-go-specific-page actual-page-nav-buttons'
                        : 'button-go-specific-page'
                    }
                  >
                    <h4>{page}</h4>
                  </button>
                ))}
              </div>
              <button
                disabled={!loaded}
                onClick={() => {
                  if (nextPage) {
                    const page = params.page + 1;
                    setParams({ ...params, page: page });
                  }
                }}
                className={
                  nextPage
                    ? 'test-page-button-page'
                    : 'test-page-button-page test-page-button-page-disabled'
                }
              >
                Next
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </section>
      {showFilter ? (
        <FilterTest
          disable={disable}
          setDisable={setDisable}
          setShowFilter={setShowFilter}
          typeTest={typeTest}
          setTypeTest={setTypeTest}
          params={params}
          setParams={setParams}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Tests;
