import './Home.css';

import { useEffect, useState } from 'react';

import Carousel from '../components/Carousel';
import { API } from '../services/API';
/* import DayTest from '../components/DayTest';
import RandomTest from '../components/RandomTest'; */

const Home = () => {
  const [bestTests, setBestTests] = useState([]);
  const [list, setList] = useState(undefined);

  const [params, setParams] = useState({
    limit: 6,
    order: 'favorites',
    title: '',
    page: 1,
    mode: 1,
  });

  const getBestTests = () => {
    API.get('/generictests', { params: params }).then((res) => {
      if (res.status === 200) {
        let prevList = res.data.results;

        API.get('/featuredtests', { params: params }).then((res) => {
          prevList = [...prevList, ...res.data.results];
          const mappedList = prevList.map((test) => ({
            banner: test.banner,
            title: test.title,
          }));
          setList(mappedList);
        });
      }
    });
  };

  useEffect(() => {
    getBestTests();
    console.log(list);
  }, []);
  return (
    <section className="home-section">
      {list != undefined ? <Carousel list={list} /> : <h3>Loading...</h3>}

      {/* <DayTest /> */}
      {/*  <RandomTest /> */}
    </section>
  );
};

export default Home;
