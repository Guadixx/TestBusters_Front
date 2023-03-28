import '../EditProfileModal/EditProfileModal.css';
import './EditTestModal.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { API } from '../../services/API';
/* import { checkUser } from '../services/checkForm'; */
import Palette from '../../styles/Palette';
import Button from '../../ui/Button';
import { Heading_6 } from '../../ui/Headings';
import ImageTests from '../../ui/ImageTests';
import Thumbnail from '../../ui/Thumbnail';

const EditTestsModal = ({ test, showEditModal, setShowEditModal }) => {
  const { register, handleSubmit } = useForm();
  const [thumbnailFileName, setThumbnailFileName] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [editTitle, setEditTitle] = useState(0);
  const [editDescription, setEditDescription] = useState(0);
  const [errorMessage, setErrorMesssage] = useState('');
  const testType = test.test_type == 'generic' ? 'generictests' : 'featuredtests';
  /* 
  const userObject = {
    spaces: 0,
    lowerCase: -1,
    upperCase: -1,
    number: -1,
    symbol: 0,
    forbidden: ['pene', 'caca', 'pussy', 'penis', 'verga', 'puta'],
  };
 */
  const updateTest = (formData) => {
    const updatedTest = {
      title: formData.title,
      description: formData.description,
      thumbnail: formData.thumbnail[0],
      banner: formData.banner[0],
    };

    API.put(`/${testType}/id/${test._id}`, updatedTest, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('test updated');
          window.location.reload();
        } else {
          console.log('error updating');
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMesssage('That title is taken. Try another?');
      });
  };

  const generateUrlThumbnail = (item) => {
    const url = URL.createObjectURL(item);
    setThumbnailPreview(url);
    console.log(url);
  };

  const generateUrlBanner = (item) => {
    const url = URL.createObjectURL(item);
    setBannerPreview(url);
    console.log(url);
  };
  return (
    <>
      {showEditModal ? (
        <div className="edit-profile-modal">
          <form className="edit-profile" onSubmit={handleSubmit(updateTest)}>
            <div className="edit-profile-images">
              <div className="edit-profile-avatar">
                <Thumbnail
                  src={thumbnailPreview != '' ? thumbnailPreview : test.thumbnail}
                  alt="test thumbnail"
                />
                <input
                  type="file"
                  id="thumbnail"
                  className="thumbnail-file"
                  {...register('thumbnail')}
                  onChange={(ev) => {
                    setThumbnailFileName(ev.target.files[0].name);
                    generateUrlThumbnail(ev.target.files[0]);
                  }}
                />
                <label htmlFor="thumbnail" className="thumbnail-label">
                  {thumbnailFileName != '' ? thumbnailFileName : 'Upload file'}
                </label>
              </div>
              <div className="edit-profile-banner">
                <ImageTests
                  radius="xl"
                  width="200px"
                  height="7.2rem"
                  src={bannerPreview != '' ? bannerPreview : test.banner}
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
                id="title"
                name="title"
                defaultValue={test.title}
                {...register('title')}
                maxLength="100"
                onChange={(ev) => setEditTitle(ev.target.value.length)}
              />
              <label htmlFor="title" className="custom-placeholder-profile">
                Username
              </label>
              <Heading_6
                position="absolute"
                text={editTitle ? `${editTitle}/100` : `${test.title.length}/100`}
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
                id="description"
                name="description"
                defaultValue={test.description}
                {...register('description')}
                maxLength="500"
                onChange={(ev) => setEditDescription(ev.target.value.length)}
              />
              <label htmlFor="description" className="custom-placeholder-profile-bio">
                Description
              </label>
              <Heading_6
                position="absolute"
                text={
                  test.description
                    ? editDescription
                      ? `${editDescription}/500`
                      : `${test.description.length}/500`
                    : '0/500'
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
                action={() => setShowEditModal(false)}
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
    </>
  );
};

export default EditTestsModal;
