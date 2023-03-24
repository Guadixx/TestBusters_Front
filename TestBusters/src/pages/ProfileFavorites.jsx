import './ProfileFavorites.css';

import { useContext, useEffect, useState } from 'react';

import EditProfileModal from '../components/EditProfileModal/EditProfileModal';
import ProfileHero from '../components/ProfileHero/ProfileHero';
import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import { Heading_4 } from '../ui/Headings';
import TestProfile from '../ui/TestProfile';

const ProfileFavorites = () => {
  const [favoritesTests, setFavoritesTest] = useState();
  const [userProfile, setUserProfile] = useState([]);
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const getUser = () => {
    API.get(`/users/${user._id}`).then((res) => {
      setUserProfile(res.data.user);
      setFavoritesTest([
        ...res.data.user.favourite_featuredTests,
        ...res.data.user.favourite_genericTests,
      ]);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <section className="profile-favorites">
      {favoritesTests != undefined && userProfile.length != 0 ? (
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
            {favoritesTests.length != 0 ? (
              favoritesTests.map((test) => (
                <TestProfile
                  key={test._id}
                  testtitle={test.title}
                  testcreator={test.creator}
                  rating={test.rating[0] / test.rating[1]}
                  thumbnail={test.thumbnail}
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
          <ProfileHero user={user} setShowModal={setShowModal} />
          <div className="no-favorites-test">
            <Heading_4 text="No favorites tests yet" />
          </div>
        </>
      )}
    </section>
  );
};

export default ProfileFavorites;
