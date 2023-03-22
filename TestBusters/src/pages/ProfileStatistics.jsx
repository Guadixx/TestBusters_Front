import './ProfileStatistics.css';

import { Spacing } from '../styles/Spacing';
import Avatar from '../ui/Avatar';
import Banner from '../ui/Banner';
import CircleBar from '../ui/CircleBar';
import { Heading_3 } from '../ui/Headings';
import NavBar from '../ui/NavBar';
import ProfileInfo from '../ui/ProfileInfo';
import Record from '../ui/Record';
import StaticsDiv from '../ui/StaticsDiv';

const ProfileStatistics = () => {
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
      <section className="statistics-section">
        <section className="statistics-first">
          <div className="statistics-numbers">
            <CircleBar level="0" value="80" label="LEVEL" />

            <StaticsDiv text="TEST PLAYED" percentage="5" />
            <StaticsDiv text="AVERAGE SCORE" percentage="83%" />
          </div>
          <div className="profile-achievements">
            <Heading_3 text="ACHIEVEMENTS" weigth="700" />
            <div className="achievements-icons">
              <Avatar
                src="https://res.cloudinary.com/dva9zee9r/image/upload/v1678977689/achievements%20icons/18.level08_MEDIUM_yp1q05.png"
                width="m"
                height="m"
              />
              <Avatar
                src="https://res.cloudinary.com/dva9zee9r/image/upload/v1678977689/achievements%20icons/18.level08_MEDIUM_yp1q05.png"
                width="m"
                height="m"
              />
              <Avatar
                src="https://res.cloudinary.com/dva9zee9r/image/upload/v1678977689/achievements%20icons/18.level08_MEDIUM_yp1q05.png"
                width="m"
                height="m"
              />
              <Avatar
                src="https://res.cloudinary.com/dva9zee9r/image/upload/v1678977689/achievements%20icons/18.level08_MEDIUM_yp1q05.png"
                width="m"
                height="m"
              />
              <Avatar
                src="https://res.cloudinary.com/dva9zee9r/image/upload/v1678977689/achievements%20icons/18.level08_MEDIUM_yp1q05.png"
                width="m"
                height="m"
              />
              <Avatar
                src="https://res.cloudinary.com/dva9zee9r/image/upload/v1678977689/achievements%20icons/18.level08_MEDIUM_yp1q05.png"
                width="m"
                height="m"
              />
              <Avatar
                src="https://res.cloudinary.com/dva9zee9r/image/upload/v1678977689/achievements%20icons/18.level08_MEDIUM_yp1q05.png"
                width="m"
                height="m"
              />
            </div>
          </div>
        </section>
        <span className="separator"></span>
        <section className="statistics-second">
          <Heading_3 text="BEST RECORDS" weigth="700" size={Spacing._5} />
          <div className="profile-records">
            <Record
              position="1"
              thumbnail="https://upload.wikimedia.org/wikipedia/commons/8/80/Collection-national-flags.png"
              name="Guess the flag"
              score="25/25"
              time="2:00"
            />
            <Record
              position="2"
              thumbnail="https://upload.wikimedia.org/wikipedia/commons/8/80/Collection-national-flags.png"
              name="Guess the flag"
              score="25/25"
              time="2:00"
            />
            <Record
              position="3"
              thumbnail="https://upload.wikimedia.org/wikipedia/commons/8/80/Collection-national-flags.png"
              name="Guess the flag"
              score="25/25"
              time="2:00"
            />
            <Record
              position="4"
              thumbnail="https://upload.wikimedia.org/wikipedia/commons/8/80/Collection-national-flags.png"
              name="Guess the flag"
              score="25/25"
              time="2:00"
            />
            <Record
              position="5"
              thumbnail="https://upload.wikimedia.org/wikipedia/commons/8/80/Collection-national-flags.png"
              name="Guess the flag"
              score="25/25"
              time="2:00"
            />
          </div>
        </section>
      </section>
    </section>
  );
};

export default ProfileStatistics;
