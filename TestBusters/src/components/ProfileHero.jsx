import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import Icons from '../styles/Icons';
import Avatar from '../ui/Avatar';
import Banner from '../ui/Banner';
import NavBar from '../ui/NavBar';
import ProfileInfo from '../ui/ProfileInfo';

const ProfileHero = ({
  printedUser,
  setShowModal,
  setShowFollowersModal,
  setShowFollowingModal,
}) => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState(printedUser.followed_users.length);

  const [followed, setFollowed] = useState(() => {
    const included = printedUser.followed_users.filter((u) => u._id == user._id);
    if (included.length > 0) {
      return true;
    } else {
      return false;
    }
  });

  const followBody = {
    followedUserId: id,
    followingUserId: user._id,
  };
  const links = [
    {
      link: `/profile/statistics/${id}`,
      name: 'Statistics',
    },
    {
      link: `/profile/created/${id}`,
      name: 'Created',
    },
    {
      link: `/profile/favorites/${id}`,
      name: 'Favorites',
    },
  ];

  const handleBtnFollow = () => {
    console.log(printedUser.followed_users);
    const included = printedUser.followed_users.filter((u) => u._id == user._id);
    console.log(included);
    if (included.length > 0) {
      setFollowed(true);
    }
  };

  const handleFollow = () => {
    API.patch('/users', followBody)
      .then((res) => {
        if (res.status === 200) {
          handleFollowed();
          handleFollowers();
          localStorage.setItem('communityUser', JSON.stringify(printedUser));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleFollowed = () => {
    setFollowed(!followed);
  };

  const handleFollowers = () => {
    if (followed) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
  };

  useEffect(() => {
    handleBtnFollow();
  }, []);
  return (
    <>
      <Banner
        size="xl"
        src={printedUser.banner}
        name="profile banner"
        radius="xl"
        width="80vw"
      />
      <Avatar
        position="absolute"
        src={printedUser.avatar}
        alt="user avatar"
        margin="4rem"
      />
      {user.username == printedUser.username ? (
        <ProfileInfo
          description={printedUser.bio}
          username={printedUser.username}
          level={printedUser.level[0]}
          followers={printedUser.followed_users.length}
          following={printedUser.following_users.length}
          buttonimg={Icons.edit}
          buttonalt="edit icon"
          buttontext="Edit Profile"
          action={() => setShowModal(true)}
          action1={() => setShowFollowersModal(true)}
          action2={() => setShowFollowingModal(true)}
        />
      ) : (
        <ProfileInfo
          description={printedUser.bio}
          username={printedUser.username}
          level={printedUser.level[0]}
          followers={followers}
          following={printedUser.following_users.length}
          buttonimg={
            followed
              ? 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679837178/achievements%20icons/check_1_xdrumw.png'
              : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679836492/achievements%20icons/plus_white_words8.png'
          }
          buttonalt="follow icon"
          buttontext={followed ? 'Following' : 'Follow'}
          buttonColor={followed ? '#212427' : '#fffeff'}
          buttonBackground={followed ? '#efefef' : '#ff4d00'}
          action={() => {
            handleFollow();
          }}
          action1={() => setShowFollowersModal(true)}
          action2={() => setShowFollowingModal(true)}
        />
      )}
      <NavBar links={links} />
    </>
  );
};

export default ProfileHero;
