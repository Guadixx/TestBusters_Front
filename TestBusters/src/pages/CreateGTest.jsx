import './CreateGTest.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import Icons from '../styles/Icons';
import Palette from '../styles/Palette';
import { Heading_1, Heading_3, Heading_5, Heading_6 } from '../ui/Headings';
import ImageTests from '../ui/ImageTests';
import Thumbnail from '../ui/Thumbnail';

const CreateGTest = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [thumbnailPrev, setThumbnailPrev] = useState('');
  const [thumbnailFileName, setThumbnailFileName] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [questionImgPrev, setQuestionImgPrev] = useState(['']);
  const [bannerFileName, setBannerFileName] = useState('');
  const [imgPrev1, setImgPrev1] = useState([]);
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
  const [ansFileName, setAnsFileName] = useState([]);

  const [description, setDescription] = useState(0);
  const [title, setTitle] = useState(0);
  const [questionType, setQuestionType] = useState(['text']);

  const [questions, setQuestions] = useState(['']);

  const [numTypeImg, setNumTypeImg] = useState(0);
  const [options, setOptions] = useState([['']]);
  const [options1, setOptions1] = useState(['']);
  const [options2, setOptions2] = useState(['']);
  const [options3, setOptions3] = useState(['']);
  const [options4, setOptions4] = useState(['']);
  const [options5, setOptions5] = useState(['']);
  const [answers, setAnswers] = useState(['']);
  const [questionImgs, setQuestionImgs] = useState(['']);
  const [ids, setIds] = useState([0]);
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
  const generateUrlQuestionImg = (item, i) => {
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

  const handleChange = (ev, i) => {
    const prevType = [...questionType];
    const previousType = prevType[i];
    prevType[i] = ev.target.value;
    setQuestionType(prevType);

    const o1 = [...options1];
    o1[i] = '';
    setOptions1(o1);
    const o2 = [...options2];
    o2[i] = '';
    setOptions2(o2);
    const o3 = [...options3];
    o3[i] = '';
    setOptions3(o3);
    const o4 = [...options4];
    o4[i] = '';
    setOptions4(o4);
    const o5 = [...options5];
    o5[i] = '';
    setOptions5(o5);
    const ans = [...answers];
    ans[i] = '';
    setAnswers(ans);
    const fileName1 = [...imgFileName1];
    fileName1[i] = 'Upload File';
    setImgFileName1(fileName1);
    const fileName2 = [...imgFileName2];
    fileName2[i] = 'Upload File';
    setImgFileName2(fileName2);
    const fileName3 = [...imgFileName3];
    fileName3[i] = 'Upload File';
    setImgFileName3(fileName3);
    const fileName4 = [...imgFileName4];
    fileName4[i] = 'Upload File';
    setImgFileName4(fileName4);
    const fileName5 = [...imgFileName5];
    fileName5[i] = 'Upload File';
    setImgFileName5(fileName5);
    const fileNameAns = [...ansFileName];
    fileNameAns[i] = 'Upload File';
    setAnsFileName(fileNameAns);
    if (previousType == 'text') {
      const questions_Imgs = [...questionImgs];
      questions_Imgs[i] = undefined;
      setQuestionImgs(questions_Imgs);
    }
  };

  const handleAnsFileName = (ev, i) => {
    const prevName = [...ansFileName];
    prevName[i] = ev.target.files[0].name;
    setAnsFileName(prevName);
  };

  const handleFileName = (ev, index, i) => {
    let prevName = [];
    switch (index + 1) {
      case 1:
        prevName = [...imgFileName1];
        prevName[i] = ev.target.files[0].name;
        setImgFileName1(prevName);
        break;
      case 2:
        prevName = [...imgFileName2];
        prevName[i] = ev.target.files[0].name;
        setImgFileName2(prevName);
        break;
      case 3:
        prevName = [...imgFileName3];
        prevName[i] = ev.target.files[0].name;
        setImgFileName3(prevName);
        break;
      case 4:
        prevName = [...imgFileName4];
        prevName[i] = ev.target.files[0].name;
        setImgFileName4(prevName);
        break;
      case 5:
        prevName = [...imgFileName5];
        prevName[i] = ev.target.files[0].name;
        setImgFileName5(prevName);
        break;
    }
  };

  const addQuestion = (ev) => {
    ev.preventDefault();
    const id = [...ids, ids.length];
    setIds(id);
    console.log(ids, 'ids');
    const number = [...questions, ''];
    setQuestions(number);
    const number1 = [...options1, ''];
    setOptions1(number1);
    const number2 = [...options2, ''];
    setOptions2(number2);
    const number3 = [...options3, ''];
    setOptions3(number3);
    const number4 = [...options4, ''];
    setOptions4(number4);
    const number5 = [...options5, ''];
    setOptions5(number5);
    const number6 = [...answers, ''];
    setAnswers(number6);
    const type = [...questionType, 'text'];
    setQuestionType(type);
    const number7 = [...options, ['']];
    setOptions(number7);
    const number8 = [...questionImgPrev, ''];
    setQuestionImgPrev(number8);
    const number9 = [...ansFileName, ''];
    setAnsFileName(number9);
    const qimg = [...questionImgs, ''];
    setQuestionImgs(qimg);
  };

  const addOption = (ev, i) => {
    ev.preventDefault();
    const actualOptions = [...options];
    actualOptions[i] = [...actualOptions[i], ''];
    setOptions(actualOptions);
  };

  const deleteOption = (index, i) => {
    let deleteValue = [];
    const deteledValue = [...options];
    deteledValue[i].splice(index);
    setOptions(deteledValue);
    switch (index + 1) {
      case 1:
        deleteValue = [...options1];
        deleteValue[i] = '';
        setOptions1(deleteValue);
        break;
      case 2:
        deleteValue = [...options2];
        deleteValue[i] = '';
        setOptions2(deleteValue);
        break;
      case 3:
        deleteValue = [...options3];
        deleteValue[i] = '';
        setOptions3(deleteValue);
        break;
      case 4:
        deleteValue = [...options4];
        deleteValue[i] = '';
        setOptions4(deleteValue);
        break;
      case 5:
        deleteValue = [...options5];
        deleteValue[i] = '';
        setOptions5(deleteValue);
        break;
    }
  };

  const deleteQuestion = (ev) => {
    ev.preventDefault();
    const id = [...ids];
    id.pop();
    setIds(id);
    const number = [...questions];
    number.pop();
    setQuestions(number);
    const number1 = [...options1];
    number1.pop();
    setOptions1(number1);
    const number2 = [...options2];
    number2.pop();
    setOptions2(number2);
    const number3 = [...options3];
    number3.pop();
    setOptions3(number3);
    const number4 = [...options4];
    number4.pop();
    setOptions4(number4);
    const number5 = [...options5];
    number5.pop();
    setOptions5(number5);
    const number6 = [...answers];
    number6.pop();
    setAnswers(number6);
    const type = [...questionType];
    type.pop();
    setQuestionType(type);
    const number7 = [...options];
    number7.pop();
    setOptions(number7);
    const number8 = [...questionImgPrev];
    number8.pop();
    setQuestionImgPrev(number8);
    const number9 = [...ansFileName];
    number9.pop();
    setAnsFileName(number9);
    const qimg = [...questionImgs];
    qimg.pop();
    setQuestionImgs(qimg);
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
  };
  const addOptionValue = (ev, index, i) => {
    let inputValue = [];
    switch (index + 1) {
      case 1:
        inputValue = [...options1];
        inputValue[i] = ev.target.value;
        setOptions1(inputValue);
        break;
      case 2:
        inputValue = [...options2];
        inputValue[i] = ev.target.value;
        setOptions2(inputValue);
        break;
      case 3:
        inputValue = [...options3];
        inputValue[i] = ev.target.value;
        setOptions3(inputValue);
        break;
      case 4:
        inputValue = [...options4];
        inputValue[i] = ev.target.value;
        setOptions4(inputValue);
        break;
      case 5:
        inputValue = [...options5];
        inputValue[i] = ev.target.value;
        setOptions5(inputValue);
        break;
    }
  };
  const addOptionImgValue = (ev, index, i) => {
    let inputValue = [];
    switch (index + 1) {
      case 1:
        inputValue = [...options1];
        inputValue[i] = ev.target.files[0];
        setOptions1(inputValue);
        break;
      case 2:
        inputValue = [...options2];
        inputValue[i] = ev.target.files[0];
        setOptions2(inputValue);
        break;
      case 3:
        inputValue = [...options3];
        inputValue[i] = ev.target.files[0];
        setOptions3(inputValue);
        break;
      case 4:
        inputValue = [...options4];
        inputValue[i] = ev.target.files[0];
        setOptions4(inputValue);
        break;
      case 5:
        inputValue = [...options5];
        inputValue[i] = ev.target.files[0];
        setOptions5(inputValue);
        break;
    }
  };

  const addQuestionValue = (ev, i) => {
    const inputValue = [...questions];
    inputValue[i] = ev.target.value;
    setQuestions(inputValue);
  };

  const addAnswerValue = (ev, i) => {
    const inputValue = [...answers];
    inputValue[i] = ev.target.value;
    setAnswers(inputValue);
  };

  const addAnswerImgValue = (ev, i) => {
    const inputValue = [...answers];
    inputValue[i] = ev.target.files[0];
    setAnswers(inputValue);
  };

  const addQuestionImgValue = (ev, i) => {
    const inputValue = [...questionImgs];
    inputValue[i] = ev.target.files[0];
    setQuestionImgs(inputValue);
  };

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

  const handleTypeImg = () => {
    const types = [...questionType];
    const imgTypes = types.filter((type) => type === 'image');
    setNumTypeImg(imgTypes);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    let idTest = '';
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

    for (const img of questionImgs) {
      if (img == '' || img == undefined) {
        questionImgs.splice(questionImgs.indexOf(img), 1);
      }
    }
    let index = 0;
    const formData2 = new FormData();
    questionImgs.forEach(() => {
      if (questionImgs[index] == undefined) {
        questionImgs.splice(index, 1);
      }
      index++;
    });
    questionImgs.forEach((file) => {
      formData2.append('question_img', file);
    });
    questionType.forEach((type) => {
      formData2.append('type', type);
    });
    questions.forEach((question) => {
      formData2.append('question', question);
    });
    answers.forEach((answer) => {
      formData2.append('answer', answer);
    });
    options1.forEach((option_1) => {
      formData2.append('option_1', option_1);
    });
    options2.forEach((option_2) => {
      formData2.append('option_2', option_2);
    });
    options3.forEach((option_3) => {
      formData2.append('option_3', option_3);
    });
    options4.forEach((option_4) => {
      formData2.append('option_4', option_4);
    });
    options5.forEach((option_5) => {
      formData2.append('option_5', option_5);
    });
    API.post('/generictests', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.status === 201) {
          idTest = res.data._id;
          formData2.append('testId', idTest);
          API.post(`/data`, formData2, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
            .then((res) => {
              if (res.status === 200) {
                console.log('data and test created');
                navigate('/tests');
                return;
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    handleTypeImg();
  });
  return (
    <section className="create-generic-test">
      {console.log(questions, 'questions')}
      {console.log(questionImgs, 'questionImages')}
      {console.log(options1, 'options1')}
      {console.log(options2, 'options2')}
      {console.log(options3, 'options3')}
      {console.log(options4, 'options4')}
      {console.log(options5, 'options5')}
      {console.log(answers, 'answers')}
      {console.log(options, 'options')}
      {console.log(questionType)}
      <Heading_1 text="Create Generic Test" weigth="700" size="28px" />
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
              <input type="radio" id="enabled" name="comments" value="Enabled" />
              <label htmlFor="enabled">Enabled</label>
            </div>
            <div className="order-random">
              <input type="radio" id="disabled" name="comments" value="Disabled" />
              <label htmlFor="disabled">Disabled</label>
            </div>
          </div>
          <div className="test-topic">
            <Heading_3 text="TOPIC" weigth="600" size="16px" />
            <input
              className="topic-input"
              type="text"
              onChange={(ev) => setNewTest({ ...newTest, topic: ev.target.value })}
            />
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
          <div className="generic-test-data">
            {questions.map((q, i) => (
              <>
                {questionType[i] == 'image' ? (
                  <div className="generic-test-question" key={i}>
                    <div className="generic-test-header">
                      <select
                        onChange={(ev) => handleChange(ev, i)}
                        defaultValue="image"
                        disabled={numTypeImg.length >= 10 ? true : false}
                      >
                        <option>text</option>
                        <option>image</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Question"
                        className="input-question"
                        onChange={(ev) => addQuestionValue(ev, i)}
                      />
                      <button
                        className="add-option"
                        onClick={(ev) => {
                          addOption(ev, i);
                        }}
                        disabled={options[i].length >= 5 ? true : false}
                      >
                        <img src={Icons.add} alt="add icon" />
                      </button>
                      <button
                        className="delete-question"
                        disabled={questions.length === i + 1 ? false : true}
                        onClick={(ev) => deleteQuestion(ev)}
                      >
                        <img src={Icons.delete} alt="delete icon" />
                      </button>
                    </div>
                    <div className="generic-test-question-image">
                      {options[i].map((option, index) => (
                        <div className="option-delete-img" key={index}>
                          <ImageTests
                            radius="xl"
                            width="200px"
                            height="8rem"
                            src={
                              index == 0 && imgPrev1[i]
                                ? imgPrev1[i]
                                : index == 1 && imgPrev2[i]
                                ? imgPrev2[i]
                                : index == 2 && imgPrev3[i]
                                ? imgPrev3[i]
                                : index == 3 && imgPrev4[i]
                                ? imgPrev4[i]
                                : index == 4 && imgPrev5[i]
                                ? imgPrev5[i]
                                : ''
                            }
                          />
                          <div className="align-label-delete">
                            <label
                              htmlFor={`option ${index + 1} ${i}`}
                              className="test-banner-label"
                            >
                              {index == 0 && imgFileName1[i]
                                ? imgFileName1[i]
                                : index == 1 && imgFileName2[i]
                                ? imgFileName2[i]
                                : index == 2 && imgFileName3[i]
                                ? imgFileName3[i]
                                : index == 3 && imgFileName4[i]
                                ? imgFileName4[i]
                                : index == 4 && imgFileName5[i]
                                ? imgFileName5[i]
                                : 'Upload file'}
                            </label>
                            <input
                              type="file"
                              id={`option ${index + 1} ${i}`}
                              className="test-banner-file"
                              onChange={(ev) => {
                                addOptionImgValue(ev, index, i);
                                handleFileName(ev, index, i);
                                generateUrlImg(ev.target.files[0], index, i);
                              }}
                            />

                            {options[i].length == index + 1 && index != 0 ? (
                              <button onClick={() => deleteOption(index, i)}>
                                <img src={Icons.delete} alt="delete icon" />
                              </button>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="option-delete-img">
                        <ImageTests
                          radius="xl"
                          width="200px"
                          height="8rem"
                          src={answerImgPrev[i] ? answerImgPrev[i] : ' '}
                        />
                        <label htmlFor={`answer ${i}`} className="test-banner-label">
                          {ansFileName[i] ? ansFileName[i] : 'Upload file'}
                        </label>
                        <input
                          type="file"
                          id={`answer ${i}`}
                          className="test-banner-file"
                          onChange={(ev) => {
                            handleAnsFileName(ev, i);
                            generateUrlAnsImg(ev.target.files[0], i);
                            addAnswerImgValue(ev, i);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="generic-test-question" key={i}>
                    <div className="generic-test-header">
                      <select onChange={(ev) => handleChange(ev, i)}>
                        <option>text</option>
                        <option>image</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Question"
                        className="input-question"
                        onChange={(ev) => addQuestionValue(ev, i)}
                      />
                      <input
                        type="file"
                        id={`questionImg ${i}`}
                        className="questionImg-file"
                        onChange={(ev) => {
                          generateUrlQuestionImg(ev.target.files[0], i);
                          addQuestionImgValue(ev, i);
                        }}
                      />
                      <label htmlFor={`questionImg ${i}`} className="addimg-label">
                        <img src={Icons.addImg} alt="add icon" />
                      </label>
                      <button
                        className="add-option"
                        onClick={(ev) => {
                          addOption(ev, i);
                        }}
                        disabled={options[i].length >= 5 ? true : false}
                      >
                        <img src={Icons.add} alt="add icon" />
                      </button>
                      <button
                        className="delete-question"
                        disabled={questions.length === i + 1 ? false : true}
                        onClick={(ev) => deleteQuestion(ev)}
                      >
                        <img src={Icons.delete} alt="delete icon" />
                      </button>
                    </div>
                    <div className="generic-test-question-text">
                      <div className="generic-test-question-options">
                        {options[i].map((option, index) => (
                          <div className="option-delete" key={index}>
                            <input
                              className="generic-test-option"
                              placeholder={`Option ${index + 1}`}
                              onChange={(ev) => addOptionValue(ev, index, i)}
                            />
                            {options[i].length == index + 1 && index != 0 ? (
                              <button onClick={() => deleteOption(index, i)}>
                                <img src={Icons.delete} alt="delete icon" />
                              </button>
                            ) : (
                              ''
                            )}
                          </div>
                        ))}
                        <input
                          className="generic-test-option"
                          placeholder="Answer"
                          onChange={(ev) => addAnswerValue(ev, i)}
                        />
                      </div>

                      {questionImgPrev[i] != '' ? (
                        <div className="generic-test-question-text-qimg">
                          <img src={questionImgPrev[i]} alt="question img" />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                )}
              </>
            ))}
            <button
              className="add-question"
              onClick={(ev) => {
                addQuestion(ev);
              }}
              disabled={questions.length >= 100 ? true : false}
            >
              <img src={Icons.add} alt="add icon" /> Add Question
            </button>
          </div>
          {numTypeImg.length >= 10 ? (
            <Heading_5 text="The maximun number of image type questions permitted is 10. You have the reach the limit. You can continue adding text type questions." />
          ) : (
            <></>
          )}
          <button type="submit" className="create-test-button">
            Create Test
          </button>
        </section>
      </form>
    </section>
  );
};

export default CreateGTest;
