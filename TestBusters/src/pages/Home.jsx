import './Home.css';

import { useEffect, useState } from 'react';

import Carousel from '../components/Carousel';
import DayTest from '../components/DayTest';
import RandomTest from '../components/RandomTest';
import { API } from '../services/API';
import Spinner from '../ui/Spinner';

const Home = () => {
  const [list, setList] = useState(undefined);

  const params = {
    limit: 6,
    order: 'favorites',
    title: '',
    page: 1,
    mode: 1,
  };

  const getBestTests = () => {
    API.get('/generictests', { params: params })
      .then((res) => {
        if (res.status === 200) {
          let prevList = res.data.results;

          API.get('/featuredtests', { params: params }).then((res) => {
            prevList = [...prevList, ...res.data.results];
            setList(prevList);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBestTests();
  }, []);
  return (
    <section className="home-section">
      {list != undefined ? <Carousel list={list} /> : <Spinner />}

      <DayTest />
      <RandomTest />
    </section>
  );
};

export default Home;
