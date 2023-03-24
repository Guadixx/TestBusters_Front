import './ProfileStatistics.css';

import { useContext, useEffect, useState } from 'react';

import EditProfileModal from '../components/EditProfileModal/EditProfileModal';
import ProfileHero from '../components/ProfileHero';
import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import Palette from '../styles/Palette';
import { Spacing } from '../styles/Spacing';
import Achievement from '../ui/Achievement';
import CircleBar from '../ui/CircleBar';
import { Heading_3, Heading_4 } from '../ui/Headings';
import Record from '../ui/Record';
import StaticsDiv from '../ui/StaticsDiv';

const ProfileStatistics = () => {
  const { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState([]);
  const [averageUser, setAverageUser] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const getUser = () => {
    API.get(`/users/${user._id}`).then((res) => {
      setUserProfile(res.data.user);
      setAverageUser(res.data.average);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <section className="profile-statics">
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

          <ProfileHero user={userProfile} setShowModal={setShowModal} />
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
                <StaticsDiv
                  text="AVERAGE SCORE"
                  percentage={averageUser == null ? '0%' : `${averageUser}%`}
                />
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
                      position={index + 1}
                      thumbnail={record.test.thumbnail}
                      name={record.test.title}
                      score={`${record.score.split('/')[0]}/${
                        record.score.split('/')[1]
                      }`}
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
          <ProfileHero user={user} setShowModal={setShowModal} />
          <div className="loading-statistics"></div>
        </>
      )}
    </section>
  );
};

export default ProfileStatistics;
