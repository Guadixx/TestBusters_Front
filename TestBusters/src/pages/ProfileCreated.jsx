import './ProfileCreated.css';

import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import Avatar from '../ui/Avatar';
import Banner from '../ui/Banner';
import { Heading_4 } from '../ui/Headings';
import NavBar from '../ui/NavBar';
import ProfileInfo from '../ui/ProfileInfo';
import TestProfile from '../ui/TestProfile';
const ProfileCreated = () => {
  const [createdTests, setCreatedTest] = useState();
  const [userProfile, setUserProfile] = useState([]);
  const { user } = useContext(UserContext);

  const getUser = () => {
    API.get(`/users/${user._id}`).then((res) => {
      setUserProfile(res.data.user);
      setCreatedTest([
        ...res.data.user.created_featuredTests,
        ...res.data.user.created_genericTests,
      ]);
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
    <section className="profile-created">
      {createdTests != undefined && userProfile.length != 0 ? (
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
          <section className="created-section">
            {createdTests.length != 0 ? (
              createdTests.map((test) => (
                <TestProfile
                  key={test._id}
                  testtitle={test.title}
                  testcreator={test.creator}
                  rating={test.rating[0] / test.rating[1]}
                  thumbnail={test.thumbnail}
                />
              ))
            ) : (
              <div>
                <Heading_4 text="No tests created yet" />
              </div>
            )}
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
          <div className="no-created-tests">
            <Heading_4 text="No tests created yet" />
          </div>
        </>
      )}
    </section>
  );
};

export default ProfileCreated;
