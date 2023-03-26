/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Community.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import { Heading_3, Heading_4, Heading_5 } from '../ui/Headings';

const Community = () => {
  const [commmunity, setCommunity] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [params, setParams] = useState({
    limit: 12,
    order: 'tests_played',
    username: '',
    page: 1,
    mode: -1,
  });
  const getCommunity = () => {
    console.log(params);
    API.get('/users', { params: params })
      .then((res) => {
        const data = res.data.results;
        const me = data.find((person) => person.username == user.username);
        data.splice(data.indexOf(me), 1);
        setCommunity(data);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (ev) => {
    if (ev.target.value == 'Tests played') {
      setParams({ ...params, order: 'tests_played' });
    } else {
      setParams({ ...params, order: 'next_level' });
    }
  };

  useEffect(() => {
    getCommunity();
  }, [params]);
  return (
    <section className="community">
      {console.log(params)}
      <div className="community-filter-sort">
        <input
          type="text"
          placeholder="Search user"
          className="community-filter-input"
          onChange={(ev) => {
            setParams({ ...params, username: ev.target.value });
          }}
        />
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
        {commmunity.map((user) => (
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
        ))}
      </section>
    </section>
  );
};

export default Community;
