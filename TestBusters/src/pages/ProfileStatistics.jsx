import './ProfileStatistics.css';

import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import Palette from '../styles/Palette';
import { Spacing } from '../styles/Spacing';
import Achievement from '../ui/Achievement';
import Avatar from '../ui/Avatar';
import Banner from '../ui/Banner';
import CircleBar from '../ui/CircleBar';
import { Heading_3, Heading_4 } from '../ui/Headings';
import NavBar from '../ui/NavBar';
import ProfileInfo from '../ui/ProfileInfo';
import Record from '../ui/Record';
import StaticsDiv from '../ui/StaticsDiv';

const ProfileStatistics = () => {
  const { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState([]);
  const [averageUser, setAverageUser] = useState(0);

  const getUser = () => {
    API.get(`/users/${user._id}`).then((res) => {
      setUserProfile(res.data.user);
      setAverageUser(user.data.average);
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  const links = [
    {
      link: '/profile/statistics',
      name: 'Statistics',
    },
    {
      link: '/profile/created',
      name: 'Created',
    },
    {
      link: '/profile/favorites',
      name: 'Favorites',
    },
  ];
  return (
    <section className="profile-statics">
      {console.log(averageUser)}
      {userProfile.length != 0 ? (
        <>
          <Banner size="xl" src={userProfile.banner} name="profile banner" radius="xl" />
          <Avatar
            position="absolute"
            src={userProfile.avatar}
            alt="user avatar"
            margin="4rem"
            radius="xl"
          />
          <ProfileInfo
            description="I like flags and motorcycles 🥸"
            username={userProfile.username}
            level={userProfile.level[0]}
            followers={userProfile.followed_users.length}
            following={userProfile.following_users.length}
          />
          <NavBar links={links} />
          <section className="statistics-section">
            <section className="statistics-first">
              <div className="statistics-numbers">
                <div className="circle-bar">
                  <CircleBar
                    level={userProfile.level[0]}
                    value={userProfile.level[1]}
                    label="LEVEL"
                  />
                </div>

                <StaticsDiv text="TEST PLAYED" percentage={userProfile.tests_played} />
                <StaticsDiv text="AVERAGE SCORE" percentage={`${averageUser}%`} />
              </div>
              <div className="profile-achievements">
                <Heading_3 text="ACHIEVEMENTS" weigth="700" />
                <div className="achievements-icons">
                  {userProfile.achievements.length != 0 ? (
                    userProfile.achievements.map((achievement) => (
                      <Achievement
                        src={achievement.image}
                        width="m"
                        height="m"
                        key={achievement.name}
                      />
                    ))
                  ) : (
                    <div className="no-achievements">
                      <Heading_4
                        text="Not achievements yet"
                        color={Palette.color_secundary}
                      ></Heading_4>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <span className="separator"></span>
            <section className="statistics-second">
              <Heading_3 text="BEST RECORDS" weigth="700" size={Spacing._5} />
              <div className="profile-records">
                {userProfile.records.length != 0 ? (
                  userProfile.records.map((record, index) => (
                    <Record
                      key={index}
                      position={index}
                      thumbnail={record.test.thumbnail}
                      name={record.test.title}
                      score={record.score.split('/')[0]}
                      time={record.score.split('/')[2]}
                    />
                  ))
                ) : (
                  <div className="no-records">
                    <Heading_4
                      text="Not records yet"
                      color={Palette.color_secundary}
                    ></Heading_4>
                  </div>
                )}
              </div>
            </section>
          </section>
        </>
      ) : (
        <>
          <Banner size="xl" src={user.banner} name="profile banner" radius="xl" />
          <Avatar
            position="absolute"
            src={user.avatar}
            alt="user avatar"
            margin="4rem"
            radius="xl"
          />
          <ProfileInfo
            description="I like flags and motorcycles 🥸"
            username={user.username}
            level={user.level[0]}
            followers={user.followed_users.length}
            following={user.following_users.length}
          />
          <NavBar links={links} />
          <div className="loading-statistics"></div>
        </>
      )}
    </section>
  );
};

export default ProfileStatistics;
