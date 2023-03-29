import './ProfileCreated.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ChangePasswordModal from '../components/ChangePasswordModal';
import EditProfileModal from '../components/EditProfileModal/EditProfileModal';
import FollowersModal from '../components/FollowersModal/FollowersModal';
import ProfileHero from '../components/ProfileHero';
import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import { Heading_4 } from '../ui/Headings';
import TestProfile from '../ui/TestProfile';
import Spinner from '../ui/Spinner';

const ProfileCreated = () => {
  const [createdTests, setCreatedTest] = useState();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState([]);
  const [printedUser] = useState(JSON.parse(localStorage.getItem('communityUser')));
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { id } = useParams();

  const handleTestType = (test) => {
    if (test.test_type == 'generic') {
      navigate(`/tests/${test._id}`, { state: { testType: 'generictests' } });
    } else {
      navigate(`/tests/${test._id}`, { state: { testType: 'featuredtests' } });
    }
  };

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
          {showFollowersModal ? (
            <FollowersModal
              userFollowers={printedUser.followed_users}
              setShowFollowersModal={setShowFollowersModal}
            />
          ) : (
            <></>
          )}
          {showFollowingModal ? (
            <FollowersModal
              userFollowers={printedUser.following_users}
              setShowFollowersModal={setShowFollowingModal}
            />
          ) : (
            <></>
          )}
          {showPasswordModal ? (
            <ChangePasswordModal
              user={user}
              showPasswordModal={showPasswordModal}
              setShowPasswordModal={setShowPasswordModal}
            />
          ) : (
            <></>
          )}
          <ProfileHero
            printedUser={userProfile}
            setShowModal={setShowModal}
            setShowFollowersModal={setShowFollowersModal}
            setShowFollowingModal={setShowFollowingModal}
            setShowPasswordModal={setShowPasswordModal}
          />
          <section className="created-section">
            {createdTests.length != 0 ? (
              createdTests.map((test) => (
                <TestProfile
                  key={test._id}
                  testtitle={test.title}
                  testcreator={test.creator}
                  rating={test.rating[0] / test.rating[1]}
                  thumbnail={test.thumbnail}
                  text="Details"
                  action={() => {
                    handleTestType(test);
                  }}
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
            <Spinner />
          </div>
        </>
      )}
    </section>
  );
};

export default ProfileCreated;
