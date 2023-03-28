import { useState } from 'react';

import { API } from '../services/API';
import { checkPassword } from '../services/checkForm';
import Palette from '../styles/Palette';
import Button from '../ui/Button';
import { Heading_3, Heading_6 } from '../ui/Headings';

const ChangePasswordModal = ({ user, showPasswordModal, setShowPasswordModal }) => {
  const [see, setSee] = useState(false);
  const [errorMessagePassword, setErrorMesssagePassword] = useState('');
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);

  const passwordObject = {
    spaces: 0,
    lowerCase: 1,
    upperCase: 1,
    number: 1,
    symbol: 1,
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
  return (
    <>
      {showPasswordModal ? (
        <div className="edit-profile-modal">
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
                  setShowPasswordModal(false);
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

export default ChangePasswordModal;
