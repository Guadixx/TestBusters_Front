import './CreateGTest.css';

import { useContext, useState } from 'react';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import Icons from '../styles/Icons';
import Palette from '../styles/Palette';
import { Heading_1, Heading_3, Heading_6 } from '../ui/Headings';
import ImageTests from '../ui/ImageTests';
import Thumbnail from '../ui/Thumbnail';

const CreateGTest = () => {
  const { user } = useContext(UserContext);
  const [thumbnailPrev, setThumbnailPrev] = useState('');
  const [thumbnailFileName, setThumbnailFileName] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [questionImgPrev, setQuestionImgPrev] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');
  const [imgPrev1, setImgPrev1] = useState('');
  const [imgFileName1, setImgFileName1] = useState('');
  const [imgPrev2, setImgPrev2] = useState('');
  const [imgFileName2, setImgFileName2] = useState('');
  const [imgPrev3, setImgPrev3] = useState('');
  const [imgFileName3, setImgFileName3] = useState('');
  const [imgPrev4, setImgPrev4] = useState('');
  const [imgFileName4, setImgFileName4] = useState('');
  const [imgPrev5, setImgPrev5] = useState('');
  const [imgFileName5, setImgFileName5] = useState('');
  const [answerImgPrev, setAnswerImgPrev] = useState('');

  const [ansFileName, setAnsFileName] = useState('');

  const [description, setDescription] = useState(0);
  const [title, setTitle] = useState(0);

  const [options, setOptions] = useState(['']);
  const [optionsImg, setOptionsImg] = useState(['']);
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [options4, setOptions4] = useState([]);
  const [options5, setOptions5] = useState([]);
  const [optionsImg1, setOptionsImg1] = useState([]);
  const [optionsImg2, setOptionsImg2] = useState([]);
  const [optionsImg3, setOptionsImg3] = useState([]);
  const [optionsImg4, setOptionsImg4] = useState([]);
  const [optionsImg5, setOptionsImg5] = useState([]);
  const [numQuestions, setNumQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [newtest, setNewTest] = useState({
    creator: user._id,
    title: '',
    description: '',
    thumbnail: '',
    banner: '',
    topic: 'don`t know',
    time: '',
    random: '',
    comments_enabled: 'formData.comments',
  });

  const generateUrlThumbnail = (item) => {
    const url = URL.createObjectURL(item);
    setThumbnailPrev(url);
  };
  const generateUrlBanner = (item) => {
    const url = URL.createObjectURL(item);
    setBannerPreview(url);
  };
  const generateUrlQuestionImg = (item) => {
    const url = URL.createObjectURL(item);
    setQuestionImgPrev(url);
  };
  const generateUrlImg = (item, i) => {
    const url = URL.createObjectURL(item);
    switch (i + 1) {
      case 1:
        setImgPrev1(url);
        break;
      case 2:
        setImgPrev2(url);
        break;
      case 3:
        setImgPrev3(url);
        break;
      case 4:
        setImgPrev4(url);
        break;
      case 5:
        setImgPrev5(url);
        break;
    }
  };
  const generateUrlAnsImg = (item) => {
    const url = URL.createObjectURL(item);
    setAnswerImgPrev(url);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const addOption = () => {
    const number = [...options, ''];
    setOptions(number);
  };

  const addOptionImg = () => {
    const number = [...optionsImg, ''];
    setOptionsImg(number);
  };

  const deleteOption = (i) => {
    console.log(i);
    let deleteValue = [];
    const deteledValue = [...options];
    deteledValue.splice(i);
    setOptions(deteledValue);
    switch (i + 1) {
      case 1:
        deleteValue = [...options1];
        deleteValue[numQuestions] = '';
        setOptions1(deleteValue);
        break;
      case 2:
        deleteValue = [...options2];
        deleteValue[numQuestions] = '';
        setOptions2(deleteValue);
        break;
      case 3:
        deleteValue = [...options3];
        deleteValue[numQuestions] = '';
        setOptions3(deleteValue);
        break;
      case 4:
        deleteValue = [...options4];
        deleteValue[numQuestions] = '';
        setOptions4(deleteValue);
        break;
      case 5:
        deleteValue = [...options5];
        deleteValue[numQuestions] = '';
        setOptions5(deleteValue);
        break;
    }
  };

  const deleteOptionImg = (i) => {
    let deleteValue = [];
    const deteledValue = [...optionsImg];
    deteledValue.splice(i);
    setOptionsImg(deteledValue);
    switch (i + 1) {
      case 1:
        deleteValue = [...optionsImg1];
        deleteValue[numQuestions] = '';
        setOptionsImg1(deleteValue);
        break;
      case 2:
        deleteValue = [...optionsImg2];
        deleteValue[numQuestions] = '';
        setOptionsImg2(deleteValue);
        break;
      case 3:
        deleteValue = [...optionsImg3];
        deleteValue[numQuestions] = '';
        setOptionsImg3(deleteValue);
        break;
      case 4:
        deleteValue = [...optionsImg4];
        deleteValue[numQuestions] = '';
        setOptionsImg4(deleteValue);
        break;
      case 5:
        deleteValue = [...optionsImg5];
        deleteValue[numQuestions] = '';
        setOptionsImg5(deleteValue);
        break;
    }
  };

  const addOptionValue = (ev, i) => {
    let inputValue = [];
    switch (i + 1) {
      case 1:
        inputValue = [...options1];
        inputValue[numQuestions] = ev.target.value;
        setOptions1(inputValue);
        break;
      case 2:
        inputValue = [...options2];
        inputValue[numQuestions] = ev.target.value;
        setOptions2(inputValue);
        break;
      case 3:
        inputValue = [...options3];
        inputValue[numQuestions] = ev.target.value;
        setOptions3(inputValue);
        break;
      case 4:
        inputValue = [...options4];
        inputValue[numQuestions] = ev.target.value;
        setOptions4(inputValue);
        break;
      case 5:
        inputValue = [...options5];
        inputValue[numQuestions] = ev.target.value;
        setOptions5(inputValue);
        break;
    }
  };
  const addOptionImgValue = (ev, i) => {
    let inputValue = [];
    switch (i + 1) {
      case 1:
        inputValue = [...optionsImg1];
        inputValue[numQuestions] = ev.target.files[0];
        setOptionsImg1(inputValue);
        break;
      case 2:
        inputValue = [...optionsImg2];
        inputValue[numQuestions] = ev.target.files[0];
        setOptionsImg2(inputValue);
        break;
      case 3:
        inputValue = [...optionsImg3];
        inputValue[numQuestions] = ev.target.files[0];
        setOptionsImg3(inputValue);
        break;
      case 4:
        inputValue = [...optionsImg4];
        inputValue[numQuestions] = ev.target.files[0];
        setOptionsImg4(inputValue);
        break;
      case 5:
        inputValue = [...optionsImg5];
        inputValue[numQuestions] = ev.target.files[0];
        setOptionsImg5(inputValue);
        break;
    }
  };

  const addAnswerValue = (ev) => {
    const inputValue = [...answers];
    inputValue[0] = ev.target.value;
    setAnswers(inputValue);
  };
  /*  const updateUser = (formData) => {
    const genericTest = {
      test_type: 'generic',
      creator: user.username,
      title: formData.title,
      description: formData.description,
      thumbnail: formData.thumbnail[0],
      banner: formData.banner[0],
      topic: 'don`t know',
      data: ['movida'],
      time: formData.time,
      random: formData.random,
      comments_enabled: formData.comments,
    };

    API.put(`/test/generictest`, genericTest, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('test created');
          window.location.reload();
        } else {
          console.log('error creating test');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }; */
  return (
    <section className="create-generic-test">
      {console.log(optionsImg1, 'optionsImg1')}
      {console.log(optionsImg2, 'optionsImg2')}
      {console.log(optionsImg3, 'optionsImg3')}
      {console.log(optionsImg4, 'optionsImg4')}
      {console.log(optionsImg5, 'optionsImg5')}
      {console.log(answers, 'answers')}
      <Heading_1 text="Create Generic Test" weigth="700" size="28px" />
      <form className="create-generic-test-body" onSubmit={(ev) => handleSubmit(ev)}>
        <section className="create-generic-test-filters">
          <div className="time-filter">
            <Heading_3 text="TIME" weigth="600" size="16px" />
            <input type="time" />
          </div>
          <div className="order-filter" onChange={(ev) => console.log(ev.target.value)}>
            <Heading_3 text="ORDER" weigth="600" size="16px" />
            <div className="order-random">
              <input type="radio" id="random" name="order" value="random" />
              <label htmlFor="random">Random</label>
            </div>
            <div className="order-random">
              <input type="radio" id="normal" name="order" value="normal" />
              <label htmlFor="normal">Normal</label>
            </div>
          </div>
          <div className="order-filter">
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
                  onChange={(ev) => setTitle(ev.target.value.length)}
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
                  onChange={(ev) => setDescription(ev.target.value.length)}
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
          <div className="generic-test-data">
            <div className="generic-test-question">
              <div className="generic-test-header">
                <input
                  type="text"
                  placeholder="Blank title question"
                  defaultValue="Blank title question"
                  className="input-question"
                />
                <input
                  type="file"
                  id="questionImg"
                  className="questionImg-file"
                  onChange={(ev) => {
                    generateUrlQuestionImg(ev.target.files[0]);
                  }}
                />
                <label htmlFor="questionImg" className="addimg-label">
                  <img src={Icons.addImg} alt="add icon" />
                </label>
                <button
                  className="add-option"
                  onClick={() => {
                    addOption();
                  }}
                  disabled={options.length >= 5 ? true : false}
                >
                  <img src={Icons.add} alt="add icon" />
                </button>
              </div>
              <div className="generic-test-question-text">
                <div className="generic-test-question-options">
                  {options.map((option, index) => (
                    <div className="option-delete" key={index}>
                      <input
                        className="generic-test-option"
                        placeholder={`Option ${index + 1}`}
                        onChange={(ev) => addOptionValue(ev, index)}
                      />
                      {options.length == index + 1 && index != 0 ? (
                        <button onClick={() => deleteOption(index)}>Delete</button>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
                  <input
                    className="generic-test-option"
                    placeholder="Answer"
                    onChange={(ev) => addAnswerValue(ev)}
                  />
                </div>
                <div className="generic-test-question-text-qimg">
                  <img
                    src={questionImgPrev != '' ? questionImgPrev : ''}
                    alt="question img"
                  />
                </div>
              </div>
            </div>
            <div className="generic-test-question">
              <div className="generic-test-header">
                <input
                  type="text"
                  placeholder="Blank title question"
                  defaultValue="Blank title question"
                  className="input-question"
                />
                <button
                  className="add-option"
                  onClick={() => {
                    addOptionImg();
                  }}
                  disabled={optionsImg.length >= 5 ? true : false}
                >
                  <img src={Icons.add} alt="add icon" />
                </button>
              </div>
              <div className="generic-test-question-image">
                {optionsImg.map((option, index) => (
                  <div className="option-delete" key={index}>
                    <ImageTests
                      radius="xl"
                      width="250px"
                      height="7.2rem"
                      src={
                        index == 0 && imgPrev1
                          ? imgPrev1
                          : index == 1 && imgPrev2
                          ? imgPrev2
                          : index == 2 && imgPrev3
                          ? imgPrev3
                          : index == 3 && imgPrev4
                          ? imgPrev4
                          : index == 4 && imgPrev5
                          ? imgPrev5
                          : ''
                      }
                    />

                    <input
                      type="file"
                      id={`option ${index + 1}`}
                      className="test-banner-file"
                      onChange={(ev) => {
                        addOptionImgValue(ev, index);
                        {
                          index == 0
                            ? setImgFileName1(ev.target.files[0].name)
                            : index == 1
                            ? setImgFileName2(ev.target.files[0].name)
                            : index == 2
                            ? setImgFileName3(ev.target.files[0].name)
                            : index == 3
                            ? setImgFileName4(ev.target.files[0].name)
                            : index == 4
                            ? setImgFileName5(ev.target.files[0].name)
                            : '';
                        }

                        generateUrlImg(ev.target.files[0], index);
                      }}
                    />
                    <label htmlFor={`option ${index + 1}`} className="test-banner-label">
                      {index == 0 && imgFileName1
                        ? imgFileName1
                        : index == 1 && imgFileName2
                        ? imgFileName2
                        : index == 2 && imgFileName3
                        ? imgFileName3
                        : index == 3 && imgFileName4
                        ? imgFileName4
                        : index == 4 && imgFileName5
                        ? imgFileName5
                        : 'Upload file'}
                    </label>
                    {optionsImg.length == index + 1 && index != 0 ? (
                      <button onClick={() => deleteOptionImg(index)}>Delete</button>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
                <div>
                  <ImageTests
                    radius="xl"
                    width="250px"
                    height="7.2rem"
                    src={answerImgPrev ? answerImgPrev : ' '}
                  />

                  <input
                    type="file"
                    id="answer"
                    className="test-banner-file"
                    onChange={(ev) => {
                      setAnsFileName(ev.target.files[0].name);
                      generateUrlAnsImg(ev.target.files[0]);
                    }}
                  />
                  <label htmlFor="answer" className="test-banner-label">
                    {ansFileName != '' ? ansFileName : 'Upload file'}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </section>
  );
};

export default CreateGTest;
