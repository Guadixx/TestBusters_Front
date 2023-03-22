import './ProfileCreated.css';

import Avatar from '../ui/Avatar';
import Banner from '../ui/Banner';
import NavBar from '../ui/NavBar';
import ProfileInfo from '../ui/ProfileInfo';
const ProfileCreated = () => {
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
      <Banner
        size="xl"
        src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679500998/testbuster/4975027_v4c4p9.jpg"
        name="profile banner"
        radius="xl"
      />
      <Avatar
        position="absolute"
        src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679405348/testbuster/g4sapoyeyuw2hq3fi7de.png"
        alt="user avatar"
        margin="4rem"
        radius="xl"
      />
      <ProfileInfo
        description="I like flags and motorcycles 🥸"
        username="Rgrivas"
        level="0"
        followers="10"
        following="3"
      />
      <NavBar links={links} />
    </section>
  );
};

export default ProfileCreated;
