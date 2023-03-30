/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Home.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Carousel from '../components/Carousel';
import DayTest from '../components/DayTest';
import RandomTest from '../components/RandomTest';
import ScrollCarousel from '../components/ScrollCarousel/ScrollCarousel';
import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import Icons from '../styles/Icons';
import Palette from '../styles/Palette';
import Button from '../ui/Button';
import { Heading_1, Heading_3 } from '../ui/Headings';
import Spinner from '../ui/Spinner';

const Home = () => {
  const { user } = useContext(UserContext);
  const [list, setList] = useState(undefined);
  const [popularTests, setPopularTests] = useState([]);
  const [recentTests, setRecentTests] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const navigate = useNavigate();
  const params = {
    limit: 6,
    order: 'favorites',
    title: '',
    page: 1,
    mode: -1,
  };
  const params2 = {
    limit: 6,
    order: 'times_played',
    title: '',
    page: 1,
    mode: -1,
  };
  const params3 = {
    limit: 6,
    order: 'created',
    title: '',
    page: 1,
    mode: -1,
  };

  const getRecentTests = () => {
    API.get('/generictests', { params: params3 })
      .then((res) => {
        if (res.status === 200) {
          let prevList = res.data.results;

          API.get('/featuredtests', { params: params3 }).then((res) => {
            prevList = [...prevList, ...res.data.results];
            setRecentTests(prevList);
            setLoaded2(true);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPopularTests = () => {
    API.get('/generictests', { params: params2 })
      .then((res) => {
        if (res.status === 200) {
          let prevList = res.data.results;

          API.get('/featuredtests', { params: params2 }).then((res) => {
            prevList = [...prevList, ...res.data.results];
            setPopularTests(prevList);
            setLoaded(true);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBestTests = () => {
    API.get('/generictests', { params: params })
      .then((res) => {
        if (res.status === 200) {
          let prevList = res.data.results;

          API.get('/featuredtests', { params: params }).then((res) => {
            prevList = [...prevList, ...res.data.results];
            prevList.sort((a, b) => a - b);
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
    getPopularTests();
    getRecentTests();
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
          <div className="home-test-today">
            <DayTest />
            <RandomTest />
          </div>
          <ScrollCarousel text="Popular Tests" loaded={loaded} tests={popularTests} />
          <ScrollCarousel text="Recent Tests" loaded={loaded2} tests={recentTests} />

          <div className="home-tests">
            <div className="home-create" onClick={() => navigate('/create')}>
              <img
                src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680122093/design-tools_bnnr61.png"
                alt="design tools icon"
              />
              <div>
                <Heading_3 text="Create your tests" weigth="700" size="2vw" />
                <p>
                  Craft your own quiz, share your expertise. The power is in your hands!
                </p>
              </div>
            </div>
            <div className="home-create" onClick={() => navigate('/community')}>
              <img
                src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680122093/teamwork_ff5pnr.png"
                alt="social icon"
              />
              <div>
                <Heading_3 text="Explore the community" weigth="700" size="2vw" />
                <p>
                  Follow other creators and players. Compete with them for the leaderboard
                </p>
              </div>
            </div>
            <div
              className="home-create"
              onClick={() => navigate(`/profile/statistics/${user._id}`)}
            >
              <img
                src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680122093/puzzle_fs7dhm.png"
                alt="social icon"
              />
              <div>
                <Heading_3 text="Check your statistics" weigth="700" size="2vw" />
                <p>
                  Track your progress and performance over the time. Improve your game!
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default Home;
