import './ProfileStatistics.css';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import Icons from '../styles/Icons';
import Palette from '../styles/Palette';
import { Spacing } from '../styles/Spacing';
import Achievement from '../ui/Achievement';
import Avatar from '../ui/Avatar';
import Banner from '../ui/Banner';
import Button from '../ui/Button';
import CircleBar from '../ui/CircleBar';
import { Heading_3, Heading_4 } from '../ui/Headings';
import ImageTests from '../ui/ImageTests';
import NavBar from '../ui/NavBar';
import ProfileInfo from '../ui/ProfileInfo';
import Record from '../ui/Record';
import StaticsDiv from '../ui/StaticsDiv';

const ProfileStatistics = () => {
  const { user } = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [userProfile, setUserProfile] = useState([]);
  const [averageUser, setAverageUser] = useState(0);
  const [avatarFileName, setAvatarFileName] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [showModal, setShowModal] = useState(false);
  const getUser = () => {
    API.get(`/users/${user._id}`).then((res) => {
      setUserProfile(res.data.user);
      setAverageUser(user.data.average);
    });
  };

  const updateUser = (formData) => {
    const updatedUser = {
      username: formData.username,
      bio: formData.bio,
      avatar: formData.avatar[0],
      banner: formData.banner[0],
    };

    console.log(formData);
    API.put(`/users/${user._id}`, updatedUser, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('user updated');
          localStorage.setItem('user', JSON.stringify(res.data));
          window.location.reload();
        } else {
          console.log('error updating');
        }
      })
      .catch((error) => console.log(error));
  };
  const generateUrlAvatar = (item) => {
    const url = URL.createObjectURL(item);
    setAvatarPreview(url);
    console.log(url);
  };

  const generateUrlBanner = (item) => {
    const url = URL.createObjectURL(item);
    setBannerPreview(url);
    console.log(url);
  };

  useEffect(() => {
    getUser();
  }, []);

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
      {userProfile.length != 0 ? (
        <>
          {showModal ? (
            <div className="edit-profile-modal">
              <form className="edit-profile" onSubmit={handleSubmit(updateUser)}>
                <div className="edit-profile-images">
                  <div className="edit-profile-avatar">
                    <Avatar
                      src={avatarPreview != '' ? avatarPreview : userProfile.avatar}
                      alt="user avatar"
                      width="l"
                      height="l"
                      id="avatarImg"
                    />
                    <input
                      type="file"
                      id="avatar"
                      className="avatar-file"
                      {...register('avatar')}
                      onChange={(ev) => {
                        setAvatarFileName(ev.target.files[0].name);
                        generateUrlAvatar(ev.target.files[0]);
                      }}
                    />
                    <label htmlFor="avatar" className="avatar-label">
                      {avatarFileName != '' ? avatarFileName : 'Upload file'}
                    </label>
                  </div>
                  <div className="edit-profile-banner">
                    <ImageTests
                      radius="xl"
                      width="200px"
                      height="100px"
                      src={bannerPreview != '' ? bannerPreview : userProfile.banner}
                    />

                    <input
                      type="file"
                      id="banner"
                      className="banner-file"
                      {...register('banner')}
                      onChange={(ev) => {
                        setBannerFileName(ev.target.files[0].name);
                        generateUrlBanner(ev.target.files[0]);
                      }}
                    />
                    <label htmlFor="banner" className="banner-label">
                      {bannerFileName != '' ? bannerFileName : 'Upload file'}
                    </label>
                  </div>
                </div>
                <div className="edit-username">
                  <input
                    className="input_username"
                    type="text"
                    placeholder=" "
                    id="username"
                    name="username"
                    defaultValue={userProfile.username}
                    {...register('username')}
                  />
                  <label htmlFor="username" className="custom-placeholder-profile">
                    Username
                  </label>
                </div>
                <div className="edit-bio">
                  <textarea
                    className="input_bio"
                    type="text"
                    placeholder=" "
                    id="bio"
                    name="bio"
                    defaultValue={userProfile.bio}
                    {...register('bio')}
                  />
                  <label htmlFor="bio" className="custom-placeholder-profile-bio">
                    Description
                  </label>
                </div>

                <div className="profile-modal-buttons">
                  <Button
                    variant="border"
                    color={Palette.color_primary}
                    background="transparent"
                    textBefore="Cancel"
                    size="4"
                    fixed_width="90px"
                    action={() => setShowModal(false)}
                  />
                  <Button
                    background={Palette.color_highlight_primary}
                    color={Palette.color_bg}
                    textBefore=" Save "
                    size="4"
                    fixed_width="90px"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          ) : (
            <></>
          )}

          <Banner
            size="xl"
            src={userProfile.banner}
            name="profile banner"
            radius="xl"
            width="80vw"
          />

          <Avatar
            position="absolute"
            src={userProfile.avatar}
            alt="user avatar"
            margin="4rem"
          />
          <ProfileInfo
            description={userProfile.bio}
            username={userProfile.username}
            level={userProfile.level[0]}
            followers={userProfile.followed_users.length}
            following={userProfile.following_users.length}
            buttonimg={Icons.edit}
            buttonalt="edit profile icon"
            buttontext="Edit Profile"
            action={() => setShowModal(true)}
          />
          <NavBar links={links} />
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
                <StaticsDiv text="AVERAGE SCORE" percentage={`${averageUser}%`} />
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
                      score={record.score.split('/')[0]}
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
          <Banner
            size="xl"
            src={user.banner}
            name="profile banner"
            radius="xl"
            width="80vw"
          />
          <Avatar
            position="absolute"
            src={user.avatar}
            alt="user avatar"
            margin="4rem"
            radius="xl"
          />
          <ProfileInfo
            description={user.bio}
            username={user.username}
            level={user.level[0]}
            followers={user.followed_users.length}
            following={user.following_users.length}
            buttonimg={Icons.edit}
            buttonalt="edit profile icon"
            buttontext="Edit Profile"
            action={() => setShowModal(true)}
          />
          <NavBar links={links} />
          <div className="loading-statistics"></div>
        </>
      )}
    </section>
  );
};

export default ProfileStatistics;
