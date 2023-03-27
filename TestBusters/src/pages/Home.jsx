import './Home.css';

import { useEffect, useState } from 'react';

import Carousel from '../components/Carousel';
import { API } from '../services/API';
/* import DayTest from '../components/DayTest';
import RandomTest from '../components/RandomTest'; */

const Home = () => {
  const [bestTests, setBestTests] = useState([]);
  const [list, setList] = useState([]);

  const [params, setParams] = useState({
    limit: 3,
    order: '',
    title: '',
    page: 1,
    mode: 1,
  });

  const getBestTests = () => {
    API.get('/generictests', { params: params }).then((res) => {
      if (res.status === 200) {
        setBestTests([...list, res.data.results]);

        API.get('/featuredtests', { params: params }).then((res) => {
          setBestTests([...list, res.data.results]);
          console.log(bestTests);
          bestTests.forEach((tests) => {
            setList([...list, tests.banner]);
          });
        });
      }
    });
  };

  useEffect(() => {
    getBestTests();
  }, []);
  return (
    <section className="home-section">
      <Carousel list={list} />

      {/* <DayTest /> */}
      {/*  <RandomTest /> */}
    </section>
  );
};

export default Home;
