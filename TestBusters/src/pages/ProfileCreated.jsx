import './ProfileCreated.css';

import Palette from '../styles/Palette';
import Avatar from '../ui/Avatar';
import Banner from '../ui/Banner';
import Button from '../ui/Button';
import { Heading_3 } from '../ui/Headings';
import NavBar from '../ui/NavBar';
import ProfileInfo from '../ui/ProfileInfo';
import Rating from '../ui/Rating';
import Thumbnail from '../ui/Thumbnail';
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
      <section className="created-section">
        <div className="test-preview">
          <Thumbnail
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/Collection-national-flags.png"
            alt="test thumbnail"
            width="s"
            height="s"
          />
          <div className="test-preview-first">
            <div className="test-preview-info">
              <Heading_3 text="Guess the flag" weigth="600" />
              <Heading_3 text="by Rgrivas9" color={Palette.color_secundary} size="14px" />
            </div>
            <Rating width="18px" height="18px" />
          </div>
          <Button textBefore="Details" color={Palette.color_secundary} size="4" />
        </div>
      </section>
    </section>
  );
};

export default ProfileCreated;
