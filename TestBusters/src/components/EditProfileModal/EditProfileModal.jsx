import './EditProfileModal.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { API } from '../../services/API';
import { checkPassword, checkUser } from '../../services/checkForm';
import Palette from '../../styles/Palette';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import { Heading_3, Heading_6 } from '../../ui/Headings';
import ImageTests from '../../ui/ImageTests';
const EditProfileModal = ({ user, showModal, setShowModal }) => {
  const { register, handleSubmit } = useForm();
  const [avatarFileName, setAvatarFileName] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [editUsername, setEditUsername] = useState(0);
  const [editBio, setEditBio] = useState(0);
  const [errorMessage, setErrorMesssage] = useState('');
  const [errorMessagePassword, setErrorMesssagePassword] = useState('');
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [see, setSee] = useState(false);
  const passwordObject = {
    spaces: 0,
    lowerCase: 1,
    upperCase: 1,
    number: 1,
    symbol: 1,
  };
  const userObject = {
    spaces: 0,
    lowerCase: -1,
    upperCase: -1,
    number: -1,
    symbol: 0,
    forbidden: ['pene', 'caca', 'pussy', 'penis', 'verga', 'puta'],
  };
  const changePassword = () => {
    if (
      newPassword == confirmNewPassword &&
      password != null &&
      newPassword != null &&
      password != '' &&
      newPassword != ''
    ) {
      if (checkPassword(password, passwordObject)) {
        API.patch(`/users/changepassword/${user._id}`, {
          password: password,
          newpassword: newPassword,
        })
          .then((res) => {
            if (res.status == 200) {
              setErrorMesssagePassword('password changed');
            }
          })
          .catch(() => {
            setErrorMesssagePassword('Wrong password');
          });
      } else {
        setErrorMesssagePassword(
          'Invalid password. Must use symbols, numbers, lower and upper chars',
        );
      }
    }
    if (newPassword != confirmNewPassword) {
      setErrorMesssagePassword('Passwords does not match');
    } else {
      return;
    }
  };
  const updateUser = (formData) => {
    const updatedUser = {
      username: formData.username,
      bio: formData.bio,
      avatar: formData.avatar[0],
      banner: formData.banner[0],
    };
    if (checkUser(formData.username, userObject)[0]) {
      API.put(`/users/${user._id}`, updatedUser, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((res) => {
          if (res.status === 200) {
            console.log('user updated');
            localStorage.setItem('user', JSON.stringify(res.data));
            localStorage.setItem('communityUser', JSON.stringify(res.data));
            window.location.reload();
          } else {
            console.log('error updating');
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMesssage('That username is taken. Try another?');
        });
    } else {
      setErrorMesssage('That username is not valid. Try another?');
    }
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

  return (
    <>
      {showModal ? (
        <div className="edit-profile-modal">
          <form className="edit-profile" onSubmit={handleSubmit(updateUser)}>
            <div className="edit-profile-images">
              <div className="edit-profile-avatar">
                <Avatar
                  src={avatarPreview != '' ? avatarPreview : user.avatar}
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
                  src={bannerPreview != '' ? bannerPreview : user.banner}
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
                defaultValue={user.username}
                {...register('username')}
                maxLength="20"
                onChange={(ev) => setEditUsername(ev.target.value.length)}
              />
              <label htmlFor="username" className="custom-placeholder-profile">
                Username
              </label>
              <Heading_6
                position="absolute"
                text={editUsername ? `${editUsername}/20` : `${user.username.length}/20`}
                top="0"
                right="0"
                margin=" 2rem 1rem 0 0 "
                size="10px"
                color={Palette.color_secundary}
              />
            </div>
            <div className="edit-bio">
              <textarea
                className="input_bio"
                type="text"
                placeholder=" "
                id="bio"
                name="bio"
                defaultValue={user.bio}
                {...register('bio')}
                maxLength="200"
                onChange={(ev) => setEditBio(ev.target.value.length)}
              />
              <label htmlFor="bio" className="custom-placeholder-profile-bio">
                Description
              </label>
              <Heading_6
                position="absolute"
                text={
                  user.bio
                    ? editBio
                      ? `${editBio}/200`
                      : `${user.bio.length}/200`
                    : '0/200'
                }
                top="0"
                right="0"
                margin=" 4.2rem 1rem 0 0 "
                size="10px"
                color={Palette.color_secundary}
              />
              <Heading_6
                position="absolute"
                top="0"
                text={errorMessage}
                margin=" 6rem 1rem 0 0 "
                size="10px"
                color="red"
              />
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
          <div className="edit-profile edit-profile-resize">
            <div className="edit-username edit-username-rescale">
              <Heading_3 text="Change password" />
              <input
                className="input_username input_username-rescale"
                type={see ? 'text' : 'password'}
                placeholder=" "
                id="password"
                name="password"
                maxLength="20"
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <label htmlFor="password" className="custom-placeholder-profile">
                Actual password
              </label>
            </div>
            <div className="edit-username">
              <input
                className="input_username input_username-rescale"
                type={see ? 'text' : 'password'}
                placeholder=" "
                id="newPassword"
                name="newPassword"
                maxLength="20"
                onChange={(ev) => setNewPassword(ev.target.value)}
              />
              <label htmlFor="newPassword" className="custom-placeholder-profile">
                New Password
              </label>
              <button className="see_btn" onClick={() => setSee(!see)}>
                {see ? (
                  <img
                    src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679514213/invisible_ljwcqc.png"
                    alt="ojo cerrado"
                  />
                ) : (
                  <img
                    src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679514203/visibilidad_c7kgso.png"
                    alt="ojo"
                  />
                )}
              </button>
            </div>
            <div className="edit-username">
              <input
                className="input_username input_username-rescale"
                type={see ? 'text' : 'password'}
                placeholder=" "
                id="confirmnewpassword"
                name="confirmnewpassword"
                maxLength="20"
                onChange={(ev) => setConfirmNewPassword(ev.target.value)}
              />
              <label htmlFor="confirmnewpassword" className="custom-placeholder-profile">
                Confirm New Password
              </label>
            </div>
            <Heading_6
              text={errorMessagePassword}
              margin=" 0.2rem 0rem"
              size="10px"
              color="red"
            />
            <div className="profile-modal-buttons">
              <Button
                background={Palette.color_highlight_primary}
                color={Palette.color_bg}
                textBefore=" Change "
                size="4"
                fixed_width="90px"
                type="submit"
                action={() => {
                  changePassword();
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditProfileModal;
