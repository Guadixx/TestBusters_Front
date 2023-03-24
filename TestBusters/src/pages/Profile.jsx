import './Profile.css';

import { useContext, useEffect, useState } from 'react';

import EditProfileModal from '../components/EditProfileModal/EditProfileModal';
import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import Icons from '../styles/Icons';
import Avatar from '../ui/Avatar';
import Banner from '../ui/Banner';
import NavBar from '../ui/NavBar';
import ProfileInfo from '../ui/ProfileInfo';

export const Profile = () => {
  const { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const getUser = () => {
    API.get(`/users/${user._id}`).then((res) => {
      setUserProfile(res.data.user);
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
    <section className="profile">
      {userProfile.length != 0 ? (
        <>
          {showModal ? (
            <EditProfileModal
              user={user}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          ) : (
            <></>
          )}

          <Banner
            size="xl"
            src={userProfile.banner}
            name="profile banner"
            radius="xl"
            width="80vw"
          />

          <Avatar
            position="absolute"
            src={userProfile.avatar}
            alt="user avatar"
            margin="4rem"
          />
          <ProfileInfo
            description={userProfile.bio}
            username={userProfile.username}
            level={userProfile.level[0]}
            followers={userProfile.followed_users.length}
            following={userProfile.following_users.length}
            buttonimg={Icons.edit}
            buttonalt="edit profile icon"
            buttontext="Edit Profile"
            action={() => setShowModal(true)}
          />
          <NavBar links={links} />
        </>
      ) : (
        <>
          <Banner
            size="xl"
            src={user.banner}
            name="profile banner"
            radius="xl"
            width="80vw"
          />
          <Avatar
            position="absolute"
            src={user.avatar}
            alt="user avatar"
            margin="4rem"
            radius="xl"
          />
          <ProfileInfo
            description={user.bio}
            username={user.username}
            level={user.level[0]}
            followers={user.followed_users.length}
            following={user.following_users.length}
            buttonimg={Icons.edit}
            buttonalt="edit profile icon"
            buttontext="Edit Profile"
            action={() => setShowModal(true)}
          />
          <NavBar links={links} />
          <div className="loading-statistics"></div>
        </>
      )}
    </section>
  );
};
export default Profile;
