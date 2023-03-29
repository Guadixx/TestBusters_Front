import './Home.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Carousel from '../components/Carousel';
import DayTest from '../components/DayTest';
import RandomTest from '../components/RandomTest';
import ScrollCarousel from '../components/ScrollCarousel/ScrollCarousel';
import { API } from '../services/API';
import Icons from '../styles/Icons';
import Palette from '../styles/Palette';
import Button from '../ui/Button';
import { Heading_1 } from '../ui/Headings';
import Spinner from '../ui/Spinner';

const Home = () => {
  const [list, setList] = useState(undefined);
  const navigate = useNavigate();
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
      {list != undefined ? (
        <>
          <div className="home-hero">
            <div className="home-message">
              <Heading_1
                text="Unlock your intellect and test your knowledge!"
                size="3.5vw"
                weigth="700"
              />
              <Button
                src={Icons.play}
                textAfter="Play Now"
                size={6}
                background={Palette.color_highlight_primary}
                color={Palette.color_bg}
                invert="invert(100%)"
                action={() => navigate('/tests')}
              />
            </div>
            <Carousel list={list} />
          </div>

          {/* <div className="home-tests">
            <DayTest />
            <RandomTest />
            <div className="home-alltests">
              <Heading_2
                text="Check out all our tests"
                weigth="800"
                size="3vw"
                color={Palette.color_bg}
              />
              <button onClick={() => navigate('/tests')}>
                <img
                  src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680113700/Recurso_1_d8dhy9.png"
                  alt="arrow icon"
                />
              </button>
            </div>
          </div> */}

          <div className="home-test-today">
            <DayTest />
            <RandomTest />
          </div>
          <ScrollCarousel />
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default Home;
