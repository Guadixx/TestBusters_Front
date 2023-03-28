/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Community.css';
import './Tests.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import { Heading_3, Heading_4, Heading_5 } from '../ui/Headings';
import Spinner from '../ui/Spinner';

const Community = () => {
  const [commmunity, setCommunity] = useState([]);
  const [onFocus, setOnFocus] = useState(false);
  const { user } = useContext(UserContext);
  const [info, setInfo] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [pagesButtons, setPagesButtons] = useState([]);
  const navigate = useNavigate();
  const [params, setParams] = useState({
    limit: 12,
    order: 'tests_played',
    username: '',
    page: 1,
    mode: -1,
  });
  const [debounceKeyword] = useDebounce(params.username, 500);
  const getCommunity = () => {
    setLoaded(false);
    API.get('/users', { params: params })
      .then((res) => {
        setLoaded(true);
        const data = res.data.results;
        res.data.info.next === null ? setNextPage(false) : setNextPage(true);
        setInfo(res.data.info);
        let acc = 1;
        const pagesButtonsList = [];
        while (acc < res.data.info.totalpages + 1) {
          pagesButtonsList.push(acc);
          acc++;
        }
        setPagesButtons(pagesButtonsList);
        const dataWithoutMe = [];
        data.forEach((eachUser) => {
          if (eachUser.username != user.username) {
            dataWithoutMe.push(eachUser);
          }
        });
        setCommunity(dataWithoutMe);
      })
      .catch((error) => console.log(error));
  };
  const goToPage = (numPage) => {
    if (params.page != numPage) {
      setParams({ ...params, page: numPage });
    }
  };
  const handleDebounce = (ev) => {
    const value = ev.target.value;
    setParams({ ...params, username: value, page: 1 });
  };

  const handleChange = (ev) => {
    if (ev.target.value == 'Tests played') {
      setParams({ ...params, order: 'tests_played', page: 1 });
    } else {
      setParams({ ...params, order: 'next_level', page: 1 });
    }
  };

  useEffect(() => {
    getCommunity();
  }, [debounceKeyword, params.order, params.page]);
  return (
    <section className="community">
      <div className="community-filter-sort">
        <div className="communuty-filter-label">
          <input
            type="text"
            placeholder={onFocus ? ' ' : ' '}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            className="community-filter-input"
            onChange={(ev) => {
              handleDebounce(ev);
            }}
          />
          <label htmlFor="custom_input" className="placeholder_title">
            Search user
          </label>
        </div>
        <select
          id="community-select"
          onChange={(ev) => {
            console.log(ev.target.value);
            handleChange(ev);
          }}
        >
          <option className="community-option">Tests played</option>
          <option className="community-option">Level</option>
        </select>
      </div>
      <section className="community-users">
        {commmunity.length != 0 ? (
          commmunity.map((user) => (
            <div
              className="community-user-card"
              key={user._id}
              onClick={() => {
                navigate(`/profile/statistics/${user._id}`);
                localStorage.setItem('communityUser', JSON.stringify(user));
              }}
            >
              <img className="community-banner" src={user.banner} alt="user banner" />
              <img className="community-avatar" src={user.avatar} alt="user avatar" />
              <div className="community-user-info">
                <Heading_3 size="14px" text={user.username} weigth="800" />
                <Heading_4 size="12px" text={`Level ${user.level[0]}`} />
              </div>
              <p>{user.bio}</p>
              <div className="community-user-follows">
                <Heading_5 text={`Followers ${user.followed_users.length}`} size="12px" />
                <Heading_5 text={`Played ${user.tests_played}`} size="12px" />
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </section>
      {(commmunity.length > params.limit - 1 || params.page != 1) &&
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
      ) : (commmunity.length > params.limit - 1 || params.page != 1) &&
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
    </section>
  );
};

export default Community;
