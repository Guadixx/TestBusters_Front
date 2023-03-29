import './ProfileFavorites.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ChangePasswordModal from '../components/ChangePasswordModal';
import EditProfileModal from '../components/EditProfileModal/EditProfileModal';
import FollowersModal from '../components/FollowersModal/FollowersModal';
import ProfileHero from '../components/ProfileHero';
import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import { Heading_4 } from '../ui/Headings';
import Spinner from '../ui/Spinner';
import TestProfile from '../ui/TestProfile';

const ProfileFavorites = () => {
  const [favoritesTests, setFavoritesTest] = useState();
  const [userProfile, setUserProfile] = useState([]);
  const [printedUser] = useState(JSON.parse(localStorage.getItem('communityUser')));
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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
      setFavoritesTest([
        ...res.data.user.favourite_featuredTests,
        ...res.data.user.favourite_genericTests,
      ]);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <section className="profile-favorites">
      {favoritesTests != undefined && loaded && userProfile.length != 0 ? (
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
            {favoritesTests.length != 0 ? (
              favoritesTests.map((test) => (
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
              <div className="no-created-yet">
                <Heading_4 text="No favorites tests yet" />
              </div>
            )}
          </section>
        </>
      ) : (
        <>
          <ProfileHero printedUser={printedUser} setShowModal={setShowModal} />
          <div className="no-favorites-test">
            <Spinner />
          </div>
        </>
      )}
    </section>
  );
};

export default ProfileFavorites;
