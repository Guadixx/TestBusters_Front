/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './CreateGTest.css';
import './CreateFTest.css';

import { useContext, useEffect, useState } from 'react';

//import Icons from '../styles/Icons';
import CreateTestModal from '../components/CreateTestModal/CreateTestModal';
import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import GetUnics from '../services/getUnics';
import Palette from '../styles/Palette';
import { Heading_1, Heading_3, Heading_6 } from '../ui/Headings';
import ImageTests from '../ui/ImageTests';
import Thumbnail from '../ui/Thumbnail';

const CreateFTest = () => {
  const { user } = useContext(UserContext);
  const [info, setInfo] = useState(undefined);
  const [data_type, setData_type] = useState(undefined);
  const [infoKeys, setInfoKeys] = useState(undefined);
  const [infoFilter_1, setInfoFilter_1] = useState(undefined);
  const [infoFilter_2, setInfoFilter_2] = useState(undefined);
  const [infoFilters, setInfoFilters] = useState(undefined);
  const [filter_1_value, setFilter_1_value] = useState('All');
  const [filter_2_value, setFilter_2_value] = useState('All');
  const [optionsNumber, setOptionsNumber] = useState('1');
  const [possible, setPossible] = useState([]);
  const [valuesFilters, setValuesFilters] = useState([]);
  const [thumbnailPrev, setThumbnailPrev] = useState('');
  const [thumbnailFileName, setThumbnailFileName] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');
  const [description, setDescription] = useState(0);
  const [title, setTitle] = useState(0);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [resultMessage] = useState('Creating test...');
  const [resultMessage2] = useState(
    'This might take some seconds. Please, wait paciently',
  );
  const [newTest, setNewTest] = useState({
    creator: user._id,
    title: '',
    description: '',
    thumbnail: '',
    banner: '',
    data_type: '',
    question: '',
    answer: '',
    question_text: ['', ''],
    time: '',
    random: '',
    comments_enabled: '',
  });
  const [newTestFilters, setnewTestFilters] = useState({
    filter_1: {
      key: 'none',
      value: 'none',
    },
    filter_2: {
      key: 'none',
      value: 'none',
    },
    filters: [{ key: '', value: [] }],
  });
  const getInfo = () => {
    API.get('/info')
      .then((res) => {
        if (res.status == 200) {
          setInfo(res.data);
          const infoKeysArray = [];
          for (const key in res.data) {
            infoKeysArray.push(key);
          }
          setInfoKeys(infoKeysArray);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const generateUrlThumbnail = (item) => {
    const url = URL.createObjectURL(item);
    setThumbnailPrev(url);
  };
  const generateUrlBanner = (item) => {
    const url = URL.createObjectURL(item);
    setBannerPreview(url);
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
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const description = `${newTest.description}/${optionsNumber}`;
    const value1format =
      newTestFilters.filter_1.value == 'All' ? '' : newTestFilters.filter_1.value;
    const value2format =
      newTestFilters.filter_2.value == 'All' ? '' : newTestFilters.filter_2.value;
    const formData = new FormData();
    formData.append('creator', newTest.creator);
    formData.append('title', newTest.title);
    formData.append('description', description);
    formData.append('thumbnail', newTest.thumbnail);
    formData.append('banner', newTest.banner);
    formData.append('time', newTest.time);
    formData.append('random', newTest.random);
    formData.append('comments_enabled', newTest.comments_enabled);
    formData.append('answer', newTest.answer);
    formData.append('question', newTest.question);
    formData.append('data_type', newTest.data_type);
    for (const question_t of newTest.question_text) {
      formData.append('question_text', question_t);
    }
    newTestFilters.filters.forEach((filter, index) => {
      formData.append(`filters[${index}][key]`, filter.key);
      filter.value.forEach((value, jindex) => {
        formData.append(`filters[${index}][value][${jindex}]`, value);
      });
    });
    formData.append('filter_1[key]', newTestFilters.filter_1.key);
    formData.append('filter_1[value]', value1format);
    formData.append('filter_2[value]', value2format);
    formData.append('filter_2[key]', newTestFilters.filter_2.key);
    API.post('/featuredtests', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.status === 201) {
          console.log('test created');
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getInfo();
  }, []);
  const options = [1, 2, 3, 4, 5];
  useEffect(() => {
    if (data_type != undefined) {
      const values_Filter1 = GetUnics(info[data_type].data, info[data_type].filter_1);
      const values_Filter2 = GetUnics(info[data_type].data, info[data_type].filter_2);
      const values_Filters = GetUnics(info[data_type].data, info[data_type].filters);
      setPossible(info[data_type].possible);
      setInfoFilter_1(['All', ...values_Filter1]);
      setInfoFilter_2(['All', ...values_Filter2]);
      setInfoFilters(values_Filters);
      setValuesFilters(values_Filters);
      setFilter_1_value('All');
      setFilter_2_value('All');
      setNewTest({ ...newTest, data_type: data_type });
      setnewTestFilters({
        filter_1: {
          key: info[data_type].filter_1,
          value: 'none',
        },
        filter_2: {
          key: info[data_type].filter_2,
          value: 'none',
        },
        filters: [{ key: info[data_type].filters, value: values_Filters }],
      });
    }
  }, [data_type]);
  useEffect(() => {
    if (data_type != undefined) {
      let filteredValues = info[data_type].data;
      let filteredValues_1 = [];
      if (filter_1_value != 'All') {
        filteredValues_1 = filteredValues.filter(
          (item) => item[info[data_type].filter_1] == filter_1_value,
        );
      }
      if (filter_1_value == 'All') {
        filteredValues_1 = filteredValues;
      }
      if (filter_2_value != 'All') {
        filteredValues = filteredValues_1.filter(
          (item) => item[info[data_type].filter_2] == filter_2_value,
        );
      }
      if (filter_2_value == 'All') {
        filteredValues = filteredValues_1;
      }
      const names = filteredValues.map((item) => item[info[data_type].filters]);
      setInfoFilters(names);
      setValuesFilters(names);
    }
  }, [filter_1_value, filter_2_value]);
  useEffect(() => {
    if (data_type != undefined) {
      setnewTestFilters({
        filter_1: {
          key: info[data_type].filter_1,
          value: filter_1_value,
        },
        filter_2: {
          key: info[data_type].filter_2,
          value: filter_2_value,
        },
        filters: [{ key: info[data_type].filters, value: valuesFilters }],
      });
    }
  }, [filter_1_value, filter_2_value, valuesFilters]);
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
              <input type="radio" id="enabled" name="comments" value="Enabled" />
              <label htmlFor="enabled">Enabled</label>
            </div>
            <div className="order-random">
              <input type="radio" id="disabled" name="comments" value="disabled" />
              <label htmlFor="disabled">Disabled</label>
            </div>
          </div>
          <div className="order-filter">
            <Heading_3 text="DATA TYPE" weigth="600" size="16px" />
            {infoKeys != undefined ? (
              infoKeys.map((key) => (
                <div className="order-random" key={key}>
                  <input
                    type="radio"
                    id="datatype"
                    name="datatype"
                    value={key}
                    onChange={(ev) => {
                      if (ev.target.checked) {
                        setData_type(key);
                      }
                    }}
                  />
                  <label htmlFor="datatype">{key}</label>
                </div>
              ))
            ) : (
              <div className="order-random">
                <Heading_6 text="Loading..." weigth="400" size="14px" />
              </div>
            )}
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
            {infoFilters != undefined ? (
              <>
                <div className="filters-featured-test-data">
                  <Heading_3 text="Filter your data" />
                  <nav className="filters-featured-test-data-nav">
                    <div className="filters-featured-test-data-nav-div-filters">
                      <label htmlFor="filter_1">{info[data_type].filter_1}</label>
                      <select
                        name="filter_1"
                        id="filter_1"
                        onChange={(ev) => {
                          setFilter_1_value(ev.target.value);
                        }}
                      >
                        {infoFilter_1.map((value) => (
                          <option value={value} key={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="filters-featured-test-data-nav-div-filters">
                      <label htmlFor="filter_2">{info[data_type].filter_2}</label>
                      <select
                        name="filter_2"
                        id="filter_2"
                        onChange={(ev) => {
                          setFilter_2_value(ev.target.value);
                        }}
                      >
                        {infoFilter_2.map((value) => (
                          <option value={value} key={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </nav>
                  <div className="filters-featured-test-data-section-div">
                    <section className="filters-featured-test-data-section">
                      {infoFilters.map((value) => (
                        <div
                          key={value}
                          className="filters-featured-test-data-checkboxdiv"
                        >
                          <input
                            type="checkbox"
                            id={value}
                            defaultChecked={valuesFilters.includes(value)}
                            onChange={(ev) => {
                              const newValues = valuesFilters;
                              if (
                                ev.target.checked &&
                                !valuesFilters.includes(ev.target.getAttribute('id'))
                              ) {
                                newValues.push(ev.target.getAttribute('id'));
                                setValuesFilters(newValues);
                              }
                              if (!ev.target.checked) {
                                const newValues = [];
                                valuesFilters.forEach((value) => {
                                  if (value != ev.target.getAttribute('id')) {
                                    newValues.push(value);
                                  }
                                });
                                setValuesFilters(newValues);
                              }
                            }}
                          />
                          <label htmlFor={value}>{value}</label>
                        </div>
                      ))}
                    </section>
                  </div>
                </div>
                <div className="filters-featured-test-data">
                  <section className="filters-featured-test-options-section">
                    <Heading_3 text="Customize the format of the question" />
                    <div className="create-featured-custom-question">
                      <div className="filters-featured-test-question-custom">
                        <label htmlFor="question1">1st part of the question</label>
                        <input
                          type="text"
                          placeholder="Ej: What is this"
                          id="question1"
                          onChange={(ev) => {
                            setNewTest({
                              ...newTest,
                              question_text: [ev.target.value, newTest.question_text[1]],
                            });
                          }}
                        />
                      </div>
                      <div className="filters-featured-test-question-custom">
                        <label htmlFor="question">Question field</label>
                        <select
                          name="question"
                          id="question"
                          onChange={(ev) => {
                            setNewTest({
                              ...newTest,
                              question: ev.target.value,
                            });
                          }}
                        >
                          <option value="-">-</option>
                          {possible.map((pos) => (
                            <option value={pos} key={pos}>
                              {pos}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="filters-featured-test-question-custom">
                        <label htmlFor="question2">2nd part of the question</label>
                        <input
                          type="text"
                          placeholder="Ej: ?"
                          id="question2"
                          onChange={(ev) => {
                            setNewTest({
                              ...newTest,
                              question_text: [newTest.question_text[0], ev.target.value],
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="create-featured-custom-question">
                      <div className="create-featured-custom-answers">
                        <div className="filters-featured-test-question-custom">
                          <label htmlFor="answer">Answer field</label>
                          <select
                            name="answer"
                            id="answer"
                            onChange={(ev) => {
                              setNewTest({
                                ...newTest,
                                answer: ev.target.value,
                              });
                            }}
                          >
                            <option value="-">-</option>
                            {possible.map((pos) => (
                              <option value={pos} key={pos}>
                                {pos}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="filters-featured-test-question-custom">
                        <label htmlFor="options">No. of options</label>
                        <select
                          name="options"
                          id="options"
                          onChange={(ev) => {
                            setOptionsNumber(ev.target.value);
                          }}
                        >
                          {options.map((op) => (
                            <option value={op} key={op}>
                              {op}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </section>
                  {newTest.question != '' && newTest.answer != '' ? (
                    <section className="filters-featured-test-options-section">
                      <Heading_3 text="Preview" />
                      <div className="questionpreview">
                        <Heading_3 text={newTest.question_text[0]} />
                        {info[data_type].data[0][newTest.question]
                          .toString()
                          .includes('cloudinary') ? (
                          <img
                            src={info[data_type].data[0][newTest.question]}
                            alt="Question preview"
                          />
                        ) : (
                          <Heading_3 text={info[data_type].data[0][newTest.question]} />
                        )}
                        <Heading_3 text={newTest.question_text[1]} />
                      </div>

                      <div className="optionspreview">
                        {info[data_type].data[0][newTest.answer]
                          .toString()
                          .includes('cloudinary') ? (
                          <img
                            src={info[data_type].data[0][newTest.answer]}
                            alt="Answer preview"
                          />
                        ) : (
                          <Heading_3 text={info[data_type].data[0][newTest.answer]} />
                        )}
                        {info[data_type].data
                          .slice(1, parseInt(optionsNumber) + 1)
                          .map((item) =>
                            item[newTest.answer].toString().includes('cloudinary') ? (
                              <img
                                key={item._id}
                                src={item[newTest.answer]}
                                alt="option preview"
                              />
                            ) : (
                              <div key={item._id}>{item[newTest.answer]}</div>
                            ),
                          )}
                      </div>
                    </section>
                  ) : (
                    <Heading_3 text="Preview" />
                  )}
                </div>
              </>
            ) : (
              <div className="filters-featured-test-data">
                <Heading_6
                  text="Choose a data type from our collection"
                  weigth="600"
                  size="24px"
                />
              </div>
            )}
          </div>
          {showResultsModal ? (
            <CreateTestModal text1={resultMessage} text2={resultMessage2} />
          ) : (
            <></>
          )}
          <button
            type="submit"
            className="create-test-button"
            disabled={infoFilters != undefined ? false : true}
            onClick={() => setShowResultsModal(true)}
          >
            Create Test
          </button>
        </section>
      </form>
    </section>
  );
};

export default CreateFTest;
