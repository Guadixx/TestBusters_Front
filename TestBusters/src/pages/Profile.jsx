import './Profile.css';

import Avatar from '../ui/Avatar';
import Banner from '../ui/Banner';

export const Profile = () => {
  return (
    <section className="profile">
      <div className="transition"></div>
      <Banner
        size="xl"
        src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679497487/testbuster/1000_F_180621977_gzjLxeqeILcIFH2UWoJG0xEmwVe8abG6_ebzuad.jpg"
        name="profile banner"
      />
      <Avatar
        position="absolute"
        src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679405348/testbuster/g4sapoyeyuw2hq3fi7de.png"
        alt="user avatar"
      />
    </section>
  );
};
export default Profile;
