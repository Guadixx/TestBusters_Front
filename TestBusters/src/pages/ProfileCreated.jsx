import './ProfileCreated.css';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EditProfileModal from '../components/EditProfileModal/EditProfileModal';
import ProfileHero from '../components/ProfileHero';
import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import { Heading_4 } from '../ui/Headings';
import TestProfile from '../ui/TestProfile';

const ProfileCreated = () => {
  const [createdTests, setCreatedTest] = useState();
  const [userProfile, setUserProfile] = useState([]);
  const userLocal = localStorage.getItem('communityUser');
  const printedUser = JSON.parse(userLocal);
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const getUser = () => {
    API.get(`/users/${id}`).then((res) => {
      setUserProfile(res.data.user);
      localStorage.setItem('communityUser', JSON.stringify(res.data.user));
      setCreatedTest([
        ...res.data.user.created_featuredTests,
        ...res.data.user.created_genericTests,
      ]);
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
          <ProfileHero printedUser={userProfile} setShowModal={setShowModal} />
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
          {console.log(printedUser)}
          <ProfileHero printedUser={printedUser} setShowModal={setShowModal} />
          <div className="no-created-tests">
            <Heading_4 text="No tests created yet" />
          </div>
        </>
      )}
    </section>
  );
};

export default ProfileCreated;
