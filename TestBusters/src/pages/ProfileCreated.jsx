import './ProfileCreated.css';

import { useContext, useEffect, useState } from 'react';

import EditProfileModal from '../components/EditProfileModal/EditProfileModal';
import ProfileHero from '../components/ProfileHero/ProfileHero';
import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import { Heading_4 } from '../ui/Headings';
import TestProfile from '../ui/TestProfile';

const ProfileCreated = () => {
  const [createdTests, setCreatedTest] = useState();
  const [userProfile, setUserProfile] = useState([]);
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const getUser = () => {
    API.get(`/users/${user._id}`).then((res) => {
      setUserProfile(res.data.user);
      setCreatedTest([
        ...res.data.user.created_featuredTests,
        ...res.data.user.created_genericTests,
      ]);
      console.log(createdTests);
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <section className="profile-created">
      {createdTests != undefined && userProfile.length != 0 ? (
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
          <ProfileHero user={user} setShowModal={setShowModal} />
          <div className="no-created-tests">
            <Heading_4 text="No tests created yet" />
          </div>
        </>
      )}
    </section>
  );
};

export default ProfileCreated;
