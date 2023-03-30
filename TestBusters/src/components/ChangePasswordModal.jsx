import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
//import useLocalStorage from '../customHooks/useLocalStorage';
import { API } from '../services/API';
import { checkPassword } from '../services/checkForm';
import Palette from '../styles/Palette';
import Button from '../ui/Button';
import { Heading_3, Heading_6 } from '../ui/Headings';

const ChangePasswordModal = ({ user, showPasswordModal, setShowPasswordModal }) => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  const [see, setSee] = useState(false);
  const [errorMessagePassword, setErrorMesssagePassword] = useState('');
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [delUserfirst, setDelUserfirst] = useState(false);
  const [delUsersecond, setDelUsersecond] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');
  const [passwordToDelete, setPasswordToDelete] = useState(null);
  const [errorDeleting, setErrorDeleting] = useState('');
  const passwordObject = {
    spaces: 0,
    lowerCase: 1,
    upperCase: 1,
    number: 1,
    symbol: 1,
  };
  const deleteUser = () => {
    API.patch(`/users/delete/${user._id}`, { password: passwordToDelete })
      .then((res) => {
        if (res.status == 200) {
          logout();
          navigate('/');
        }
        if (res.status == 201) {
          setErrorDeleting('wrong password');
          setDelUsersecond(false);
          setDelUserfirst(true);
          setConfirmDelete('');
          setPasswordToDelete(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
              setPasswordChanged(true);
              setTimeout(() => {
                setShowPasswordModal(false);
              }, 1000);
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
  return (
    <>
      {showPasswordModal ? (
        <div className="edit-profile-modal">
          {!passwordChanged ? (
            <div className="edit-profile">
              <div className="edit-username edit-username-rescale">
                <Heading_3
                  text="Change password"
                  size="24px"
                  marginbottom="2rem"
                  weigth="600"
                />
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
                <label
                  htmlFor="confirmnewpassword"
                  className="custom-placeholder-profile"
                >
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
                  variant="border"
                  color={Palette.color_primary}
                  background="transparent"
                  textBefore="Cancel"
                  size="4"
                  fixed_width="90px"
                  action={() => setShowPasswordModal(false)}
                />
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
              <button
                className="profile-modal-delete-user-button"
                onClick={() => setDelUserfirst(true)}
              >
                <Heading_6
                  text="Delete user"
                  margin=" 0.2rem 0rem"
                  size="10px"
                  color="red"
                />
              </button>
              {delUserfirst ? (
                <div className="edit-profile-delete-user-modal">
                  <Heading_3
                    text="Please confirm your password"
                    size="24px"
                    weigth="600"
                  />
                  <div className="edit-username">
                    <input
                      className="input_username input_username-rescale"
                      type="password"
                      placeholder=" "
                      id="passwordfordeleteuser"
                      name="passwordfordeleteuser"
                      maxLength="20"
                      onChange={(ev) => {
                        setPasswordToDelete(ev.target.value);
                      }}
                    />
                    <label
                      htmlFor="passwordfordeleteuser"
                      className="custom-placeholder-profile"
                    >
                      Password
                    </label>
                  </div>
                  <Heading_3
                    text={`introduce '${user.username}' bellow to continue`}
                    size="24px"
                    weigth="600"
                  />
                  <div className="edit-username">
                    <input
                      className="input_username input_username-rescale"
                      type="text"
                      placeholder=" "
                      id="confirmDelete"
                      name="confirmDelete"
                      maxLength="20"
                      onChange={(ev) => setConfirmDelete(ev.target.value)}
                    />
                    <label htmlFor="confirmDelete" className="custom-placeholder-profile">
                      Confirm delete
                    </label>
                  </div>
                  <Heading_6
                    text={errorDeleting}
                    margin=" 0.2rem 0rem"
                    size="10px"
                    color="red"
                  />

                  <div className="profile-modal-buttons">
                    <Button
                      variant="border"
                      color={Palette.color_bg}
                      background={Palette.color_highlight_primary}
                      textBefore="Cancel"
                      size="4"
                      fixed_width="90px"
                      action={() => {
                        setConfirmDelete('');
                        setPasswordToDelete(null);
                        setDelUserfirst(false);
                      }}
                    />
                    <Button
                      variant="border"
                      color={Palette.color_highlight_primary}
                      background={Palette.color_bg}
                      textBefore=" Delete "
                      size="4"
                      fixed_width="90px"
                      type="submit"
                      mode={
                        user.username == confirmDelete && passwordToDelete != null
                          ? false
                          : true
                      }
                      action={() => {
                        setDelUsersecond(true);
                        setDelUserfirst(false);
                      }}
                    />
                  </div>
                </div>
              ) : delUsersecond ? (
                <div className="edit-profile-delete-user-modal">
                  <Heading_3
                    text="Are you sure? This cannot be undone"
                    size="24px"
                    weigth="600"
                  />
                  <div className="profile-modal-buttons">
                    <Button
                      variant="border"
                      color={Palette.color_bg}
                      background={Palette.color_highlight_primary}
                      textBefore="Cancel"
                      size="4"
                      fixed_width="90px"
                      action={() => {
                        setDelUsersecond(false);
                        setDelUserfirst(false);
                      }}
                    />
                    <Button
                      variant="border"
                      color={Palette.color_highlight_primary}
                      background={Palette.color_bg}
                      textBefore=" Delete "
                      size="4"
                      fixed_width="90px"
                      type="submit"
                      action={() => {
                        deleteUser();
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div className="edit-profile rescale-edit-profile">
              <Heading_3 text="Password changed!" size="24px" weigth="600" />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChangePasswordModal;
