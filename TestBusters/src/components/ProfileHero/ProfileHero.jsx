import './ProfileHero.css';

import Icons from '../../styles/Icons';
import Avatar from '../../ui/Avatar';
import Banner from '../../ui/Banner';
import NavBar from '../../ui/NavBar';
import ProfileInfo from '../../ui/ProfileInfo';

const ProfileHero = ({ user, setShowModal }) => {
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
    <>
      <Banner
        size="xl"
        src={user.banner}
        name="profile banner"
        radius="xl"
        width="80vw"
      />
      <Avatar position="absolute" src={user.avatar} alt="user avatar" margin="4rem" />
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
    </>
  );
};

export default ProfileHero;
