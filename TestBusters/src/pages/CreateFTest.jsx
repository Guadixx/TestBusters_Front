import './CreateFTest.css';

import { useContext, useState } from 'react';

import { UserContext } from '../context/UserContext';
/* import { API } from '../services/API';
import Icons from '../styles/Icons'; */
import Palette from '../styles/Palette';
import { Heading_1, Heading_3, Heading_6 } from '../ui/Headings';
import ImageTests from '../ui/ImageTests';
import Thumbnail from '../ui/Thumbnail';

const CreateFTest = () => {
  const { user } = useContext(UserContext);

  const [thumbnailPrev, setThumbnailPrev] = useState('');
  const [thumbnailFileName, setThumbnailFileName] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');
  /*  const [imgPrev1, setImgPrev1] = useState([]);
  const [imgFileName1, setImgFileName1] = useState([]);
  const [imgPrev2, setImgPrev2] = useState([]);
  const [imgFileName2, setImgFileName2] = useState([]);
  const [imgPrev3, setImgPrev3] = useState([]);
  const [imgFileName3, setImgFileName3] = useState([]);
  const [imgPrev4, setImgPrev4] = useState([]);
  const [imgFileName4, setImgFileName4] = useState([]);
  const [imgPrev5, setImgPrev5] = useState([]);
  const [imgFileName5, setImgFileName5] = useState([]);
  const [answerImgPrev, setAnswerImgPrev] = useState([]);
  const [ansFileName, setAnsFileName] = useState([]); */

  const [description, setDescription] = useState(0);
  const [title, setTitle] = useState(0);
  const [newTest, setNewTest] = useState({
    creator: user._id,
    title: '',
    description: '',
    thumbnail: '',
    banner: '',
    topic: '',
    time: '',
    random: '',
    comments_enabled: '',
  });

  const generateUrlThumbnail = (item) => {
    const url = URL.createObjectURL(item);
    setThumbnailPrev(url);
  };
  const generateUrlBanner = (item) => {
    const url = URL.createObjectURL(item);
    setBannerPreview(url);
  };
  /* const generateUrlQuestionImg = (item, i) => {
    const url = URL.createObjectURL(item);
    const qImages = [...questionImgPrev];
    qImages[i] = url;
    setQuestionImgPrev(qImages);
  };

  const generateUrlAnsImg = (item, i) => {
    const url = URL.createObjectURL(item);
    const answerImg = [...answerImgPrev];
    answerImg[i] = url;
    setAnswerImgPrev(answerImg);
  };
  const generateUrlImg = (item, index, i) => {
    const url = URL.createObjectURL(item);
    let inputValue = [];
    switch (index + 1) {
      case 1:
        inputValue = [...imgPrev1];
        inputValue[i] = url;
        setImgPrev1(inputValue);
        break;
      case 2:
        inputValue = [...imgPrev2];
        inputValue[i] = url;
        setImgPrev2(inputValue);
        break;
      case 3:
        inputValue = [...imgPrev3];
        inputValue[i] = url;
        setImgPrev3(inputValue);
        break;
      case 4:
        inputValue = [...imgPrev4];
        inputValue[i] = url;
        setImgPrev4(inputValue);
        break;
      case 5:
        inputValue = [...imgPrev5];
        inputValue[i] = url;
        setImgPrev5(inputValue);
        break;
    }
  }; */
  const handleOrder = (ev) => {
    if (ev.target.value == 'Random') {
      setNewTest({ ...newTest, random: true });
    } else {
      setNewTest({ ...newTest, random: false });
    }
  };
  const handleComments = (ev) => {
    if (ev.target.value == 'Enabled') {
      setNewTest({ ...newTest, comments_enabled: true });
    } else {
      setNewTest({ ...newTest, comments_enabled: false });
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(newTest, 'newTest');
    const formData = new FormData();
    formData.append('creator', newTest.creator);
    formData.append('title', newTest.title);
    formData.append('description', newTest.description);
    formData.append('thumbnail', newTest.thumbnail);
    formData.append('banner', newTest.banner);
    formData.append('topic', newTest.topic);
    formData.append('time', newTest.time);
    formData.append('random', newTest.random);
    formData.append('comments_enabled', newTest.comments_enabled);
    /*  API.post('/generictests', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.status === 201) {
          console.log('si');
        }
      })
      .catch((error) => console.log(error)); */
  };

  return (
    <section className="create-generic-test">
      <Heading_1 text="Create Featured Test" weigth="700" size="28px" />
      <form className="create-generic-test-body" onSubmit={(ev) => handleSubmit(ev)}>
        <section className="create-generic-test-filters">
          <div className="time-filter">
            <Heading_3 text="TIME" weigth="600" size="16px" />
            <input
              type="time"
              onChange={(ev) => setNewTest({ ...newTest, time: ev.target.value })}
            />
          </div>
          <div className="order-filter" onChange={(ev) => handleOrder(ev)}>
            <Heading_3 text="ORDER" weigth="600" size="16px" />
            <div className="order-random">
              <input type="radio" id="random" name="order" value="Random" />
              <label htmlFor="random">Random</label>
            </div>
            <div className="order-random">
              <input type="radio" id="normal" name="order" value="Normal" />
              <label htmlFor="normal">Normal</label>
            </div>
          </div>
          <div className="order-filter" onChange={(ev) => handleComments(ev)}>
            <Heading_3 text="COMMENTS" weigth="600" size="16px" />
            <div className="order-random">
              <input type="radio" id="enabled" name="comments" value="enabled" />
              <label htmlFor="enabled">Enabled</label>
            </div>
            <div className="order-random">
              <input type="radio" id="disabled" name="comments" value="disabled" />
              <label htmlFor="disabled">Disabled</label>
            </div>
          </div>
          <div className="order-filter">
            <Heading_3 text="DATA TYPE" weigth="600" size="16px" />
            <div className="order-random">
              <input type="radio" id="enabled" name="comments" value="enabled" />
              <label htmlFor="enabled">Countries</label>
            </div>
          </div>
        </section>
        <section className="create-generic-test-quiz">
          <div className="generic-test-info">
            <div className="generic-test-thumbnail">
              <Thumbnail src={thumbnailPrev ? thumbnailPrev : ' '} />
              <input
                type="file"
                id="thumbnail"
                className="thumbnail-file"
                onChange={(ev) => {
                  setThumbnailFileName(ev.target.files[0].name);
                  generateUrlThumbnail(ev.target.files[0]);
                  setNewTest({ ...newTest, thumbnail: ev.target.files[0] });
                }}
              />
              <label htmlFor="thumbnail" className="thumbnail-label">
                {thumbnailFileName != '' ? thumbnailFileName : 'Upload file'}
              </label>
            </div>
            <div className="generic-test-banner">
              <ImageTests
                radius="xl"
                width="250px"
                height="7.2rem"
                src={bannerPreview ? bannerPreview : ' '}
              />

              <input
                type="file"
                id="banner"
                className="test-banner-file"
                onChange={(ev) => {
                  setBannerFileName(ev.target.files[0].name);
                  generateUrlBanner(ev.target.files[0]);
                  setNewTest({ ...newTest, banner: ev.target.files[0] });
                }}
              />
              <label htmlFor="banner" className="test-banner-label">
                {bannerFileName != '' ? bannerFileName : 'Upload file'}
              </label>
            </div>
            <div className="generic-test-title">
              <div className="edit-title">
                <input
                  type="text"
                  id="title"
                  maxLength="100"
                  className="input-title"
                  placeholder=" "
                  onChange={(ev) => {
                    setTitle(ev.target.value.length);
                    setNewTest({ ...newTest, title: ev.target.value });
                  }}
                />
                <label htmlFor="title" className="custom-placeholder-tests">
                  Title
                </label>
                <Heading_6
                  position="absolute"
                  text={title ? `${title}/20` : `0/100`}
                  top="0"
                  right="0"
                  margin=" 1rem 1rem 0 0 "
                  size="10px"
                  color={Palette.color_secundary}
                />
              </div>
              <div className="edit-description">
                <textarea
                  className="input-description"
                  type="text"
                  placeholder=" "
                  id="description"
                  name="description"
                  maxLength="200"
                  onChange={(ev) => {
                    setDescription(ev.target.value.length);
                    setNewTest({ ...newTest, description: ev.target.value });
                  }}
                />
                <label htmlFor="description" className="custom-placeholder-description">
                  Description
                </label>
                <Heading_6
                  position="absolute"
                  text={description ? `${description}/200` : `0/200`}
                  top="0"
                  right="0"
                  margin=" 4.2rem 1rem 0 0 "
                  size="10px"
                  color={Palette.color_secundary}
                />
              </div>
            </div>
          </div>
          <div className="generic-test-data"></div>
          <button type="submit">Create Test</button>
        </section>
      </form>
    </section>
  );
};

export default CreateFTest;
