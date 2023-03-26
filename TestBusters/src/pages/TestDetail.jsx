/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './TestDetail.css';

import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useLocalStorage from '../customHooks/useLocalStorage';
import { API } from '../services/API';
import randomArray from '../services/RandomArray';
import Palette from '../styles/Palette';
import Button from '../ui/Button';
import CircleBar from '../ui/CircleBar';
import Comment from '../ui/Comments';
import DivProgress from '../ui/DivProgress';
import Leaderboard from '../ui/Leaderboard';
import ModalTest from '../ui/ModalTest';
import RatingStarTest from '../ui/RatingButton';
import RatingStatic from '../ui/RatingStatic';

const TestDetail = () => {
  const testId = useParams().id;
  const user = JSON.parse(useLocalStorage('get', 'user'));
  const location = useLocation();
  const testType = location.state.testType;
  const userId = {
    userId: user._id,
  };
  const [test, setTest] = useState({});
  const [featuredData, setFeaturedData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [userMinutes, setUserMinutes] = useState('');
  const [userSeconds, setUserSeconds] = useState('');
  const [userRecord, setUserRecord] = useState(null);
  const [average, setAverage] = useState(0);
  const [comments, setComments] = useState([]);
  const [moreComments, setMoreComments] = useState(false);
  const [newComment, setNewComment] = useState({});
  const [rated, setRated] = useState(false);
  const [favortites, setFavorites] = useState(0);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const today = `${day}/${month}/${year}`;
  useEffect(() => {
    API.patch(`/${testType}/${testId}`, userId)
      .then((res) => {
        if (res.status === 200) {
          setTest(res.data.test);
          setUserRecord(res.data.record);
          setAverage(res.data.average);
          setFavorites(res.data.test.favorites.length);
          res.data.test.favorites.forEach((userIdFav) => {
            if (userIdFav == user._id) {
              setRated(true);
            }
          });
          const commentsIds = res.data.test.comments
            .map((comment) => comment.id)
            .sort((a, b) => b - a);
          setComments(
            commentsIds.map((id) =>
              res.data.test.comments.find((comment) => comment.id == id),
            ),
          );
          setNewComment({
            testId: testId,
            model: testType == 'generictests' ? 'GenericTest' : 'FeaturedTest',
            comment: {
              user: user._id,
              content: '',
              date: today,
            },
          });
          if (testType == 'featuredtests') {
            const data_type = res.data.test.data_type;
            const value_1 =
              res.data.test.filter_1.value != 'none' ? res.data.test.filter_1.value : '';
            const value_2 =
              res.data.test.filter_2.value != 'none' ? res.data.test.filter_2.value : '';
            const key_1 = res.data.test.filter_1.key;
            const key_2 = res.data.test.filter_2.key;
            const key =
              res.data.test.filters[0] != undefined ? res.data.test.filters[0].key : null;
            const value =
              res.data.test.filters[0] != undefined ? res.data.test.filters[0].value : [];
            API.get(`/${data_type}?${key_1}=${value_1}&${key_2}=${value_2}`)
              .then((res) => {
                if (res.status === 200) {
                  let filteredData = res.data;
                  if (value.length != 0) {
                    filteredData = value.map((filter) =>
                      res.data.find((item) => item[key] == filter),
                    );
                  }
                  let index = 0;
                  filteredData.forEach((data) => {
                    index++;
                    data.id = index;
                  });
                  setFeaturedData(filteredData);
                } else {
                  console.log('not found');
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          console.log('not found');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const postComment = () => {
    API.post('/comments', newComment)
      .then((res) => {
        if (res.status == 201) {
          API.get(`/comments/${res.data._id}`)
            .then((res2) => {
              if (res2.status == 200) {
                setComments([res2.data, ...comments]);
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteComment = (commentId) => {
    API.delete(`/comments/${commentId}`)
      .then((res) => {
        if (res.status == 200) {
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFavorite = () => {
    const toHandle = { testId: testId, userId: user._id };
    const toHandleKey = testType == 'featuredtests' ? 'favoritesftest' : 'favoritesgtest';
    API.put(`${testType}/${toHandleKey}`, toHandle)
      .then((res) => {
        if (res.status == 200) {
          console.log('si');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setRated(!rated);
    setFavorites((prevFavs) => (rated ? prevFavs - 1 : prevFavs + 1));
  };
  useEffect(() => {
    if (testType == 'featuredtests' && test.description != undefined) {
      setQuestions(
        featuredData.map((item) => ({
          question: item[test.question],
          answer: item[test.answer],
          id: item.id,
          options: randomArray(
            1,
            featuredData.length,
            test.description.split('/')[1],
            item.id,
            0,
          ),
        })),
      );
    }
  }, [featuredData]);
  useEffect(() => {
    if (testType == 'generictests' && test.data != undefined) {
      const random = randomArray(0, 6, 6).map((number) =>
        number == 0 || number == 6 ? 'answer' : `option_${number}`,
      );
      setQuestions(
        test.data.map((item) => ({
          question: item.question,
          answer: item.answer,
          question_img: item.question_img,
          id: item.id,
          options: [
            item[random[0]],
            item[random[1]],
            item[random[2]],
            item[random[3]],
            item[random[4]],
            item[random[5]],
          ],
        })),
      );
    }
  }, [test]);
  useEffect(() => {
    if (test.random && questions != []) {
      let index = 1;
      let forbidden = 0;
      if (testType == 'generictests') {
        index = test.data[0].id;
        forbidden = test.data[0].id - 1;
      }
      let random = randomArray(
        index,
        questions.length + index,
        questions.length,
        forbidden,
      );
      if (testType == 'generictests') {
        random = random.map(
          (number) => number - 1,
        ); /* ------------------------------------------OJO */
      }
      const newQuestions = [];
      random.forEach((number) => {
        newQuestions.push(questions.find((question) => question.id == number));
      });
      setRandomQuestions(newQuestions);
    } else {
      setRandomQuestions(questions);
    }
  }, [questions]);
  const countDown = useCallback(() => {
    setSeconds((prevSeconds) => prevSeconds - 1);
    setUserMinutes(() => {
      return Math.floor((initialSeconds - seconds) / 60) >= 10
        ? Math.floor((initialSeconds - seconds) / 60)
        : `0${Math.floor((initialSeconds - seconds) / 60)}`;
    });
    setUserSeconds(() => {
      return Math.round(
        ((initialSeconds - seconds) / 60 - Math.floor((initialSeconds - seconds) / 60)) *
          60,
      ) >= 10
        ? Math.round(
            ((initialSeconds - seconds) / 60 -
              Math.floor((initialSeconds - seconds) / 60)) *
              60,
          )
        : `0${Math.round(
            ((initialSeconds - seconds) / 60 -
              Math.floor((initialSeconds - seconds) / 60)) *
              60,
          )}`;
    });
  });
  useEffect(() => {
    if (!start) {
      return;
    }
    if (seconds == 0 || index == randomQuestions.length) {
      setFinish(true);
      return;
    }
    if (finish) {
      return;
    } else {
      const timeoutSeconds = setInterval(countDown, 1000);
      return () => {
        clearInterval(timeoutSeconds);
      };
    }
  }, [seconds]);
  const handleStart = () => {
    setStart(true);
    setSeconds(() => {
      return parseInt(test.time.split(':')[0] * 60) + parseInt(test.time.split(':')[1]);
    });
    setInitialSeconds(() => {
      return parseInt(test.time.split(':')[0] * 60) + parseInt(test.time.split(':')[1]);
    });
    if (testType == 'featuredtests') {
      randomQuestions.forEach((question) => {
        question.options[
          Math.round(Math.random() * parseInt(test.description.split('/')[1] - 1))
        ] = question.id;
        let index = 0;
        question.options.forEach((number) => {
          if (number == 0) {
            question.options[index] = 1;
          }
          index++;
        });
      });
    }
  };
  return (
    <div>
      {!start & (test.creator != undefined) ? (
        <div className="testdetail_content">
          <div className="info_container">
            <img src={test.banner} alt="test thumbnail" className="img_banner" />
            <div className="info_content">
              <div className="thumbnail_container">
                <img
                  src={test.thumbnail}
                  alt="test thumbnail"
                  className="img_thumbnail"
                />
              </div>
              <div className="createinfo_container">
                <h1>{test != {} && test.title}</h1>
                <div className="creator_container">
                  <img src={test.creator.avatar} alt="avatar of the creator" />
                  <h4>Creator {test.creator.username}</h4>
                </div>
                <h4>📈 {test.times_played} times played</h4>
                <div className="yourfavorite_container">
                  <RatingStarTest action={() => handleFavorite()} rated={rated} />
                  <h4>{favortites}</h4>
                </div>
                <h4>🕐 Created at {test.created.split('T')[0]}</h4>
              </div>
            </div>
            <div className="footerdiv_container">
              <div className="detailtest_container">
                <RatingStatic rating={test.rating[0] / test.rating[1]} />
              </div>
              <div className="finalbtn_container">
                <Button
                  action={() => {
                    handleStart();
                  }}
                  variant="border"
                  color={Palette.color_highlight_primary}
                  textAfter="Play"
                  size={5}
                />
              </div>
            </div>
          </div>
          <div className="text_container">
            <p>{test.description.split('/')[0]}</p>
          </div>
          <div className="middle_content">
            <div className="leaderboard_content">
              <h3>LeaderBoard</h3>
              <div className="leaderranking_container">
                {test.first.length != 0 ? (
                  <Leaderboard
                    position="1"
                    avatar={
                      test.first[0].user != null
                        ? test.first[0].user.avatar
                        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/user-dummy-p4ao7p3l9bvrme1wyabiin2vr079ietul8qza7zw2w_dl4uos.png'
                    }
                    name={
                      test.first[0].user != null
                        ? test.first[0].user.username
                        : test.first[0].backup_name
                    }
                    score={test.first[0].score.split('/').slice(0, 2).join('/')}
                    time={test.first[0].score.split('/')[2]}
                  />
                ) : (
                  <div></div>
                )}
                {test.second.length != 0 ? (
                  <Leaderboard
                    position="2"
                    avatar={
                      test.second[0].user != null
                        ? test.second[0].user.avatar
                        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/user-dummy-p4ao7p3l9bvrme1wyabiin2vr079ietul8qza7zw2w_dl4uos.png'
                    }
                    name={
                      test.second[0].user != null
                        ? test.second[0].user.username
                        : test.second[0].backup_name
                    }
                    score={test.second[0].score.split('/').slice(0, 2).join('/')}
                    time={test.second[0].score.split('/')[2]}
                  />
                ) : (
                  <div></div>
                )}
                {test.third.length != 0 ? (
                  <Leaderboard
                    position="3"
                    avatar={
                      test.third[0].user != null
                        ? test.third[0].user.avatar
                        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/user-dummy-p4ao7p3l9bvrme1wyabiin2vr079ietul8qza7zw2w_dl4uos.png'
                    }
                    name={
                      test.third[0].user != null
                        ? test.third[0].user.username
                        : test.third[0].backup_name
                    }
                    score={test.third[0].score.split('/').slice(0, 2).join('/')}
                    time={test.third[0].score.split('/')[2]}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="statics_content">
              {userRecord != null ? (
                <div>
                  <h3>Your Stats</h3>
                  <CircleBar value={average} label="BETTER THAN" />
                  <DivProgress
                    value={parseInt(userRecord.score.split('/')[0])}
                    maxValue={parseInt(userRecord.score.split('/')[1])}
                    type="score"
                    text1="record"
                  />
                  <DivProgress
                    value={
                      parseInt(userRecord.score.split('/')[2].split(':')[0]) * 60 +
                      parseInt(userRecord.score.split(':')[1])
                    }
                    maxValue={
                      parseInt(test.time.split(':')[0] * 60) +
                      parseInt(test.time.split(':')[1])
                    }
                    type="time"
                    text1="time"
                  />
                </div>
              ) : (
                <div className="emptyplayer_container">
                  <h3> you have not played this test yet</h3>
                </div>
              )}
            </div>
          </div>
          <div className="commentsection_container">
            <div className="postacomment_container">
              <h4>Post Comment</h4>

              <div className="textInputWrapper">
                <input
                  type="text"
                  className="textInput"
                  placeholder="Write a comment"
                  onChange={(ev) =>
                    setNewComment({
                      ...newComment,
                      comment: { ...newComment.comment, content: ev.target.value },
                    })
                  }
                />
                <button
                  className="post_btn"
                  onClick={() => {
                    postComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
            {comments != undefined ? (
              comments.length != 0 ? (
                !moreComments ? (
                  <div>
                    {comments
                      .reverse()
                      .slice(0, 3)
                      .map((comment) => (
                        <Comment
                          idUserOnComment={comment.user._id}
                          idUser={user._id}
                          key={comment._id}
                          avatar={comment.user.avatar}
                          name={comment.user.username}
                          date={comment.date}
                          content={comment.content}
                          action={() => {
                            const actualizedComments = [];
                            comments.forEach((com) => {
                              if (com._id != comment._id) {
                                actualizedComments.push(com);
                              }
                            });
                            deleteComment(comment._id);
                            setComments(actualizedComments);
                          }}
                        ></Comment>
                      ))}
                    {comments.length > 3 ? (
                      <Button
                        variant="solid"
                        color={Palette.color_highlight_secondary}
                        background={Palette.color_bg}
                        textAfter="See more"
                        size={4}
                        action={() => setMoreComments(true)}
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                ) : (
                  <div>
                    {comments.reverse().map((comment) => (
                      <Comment
                        idUserOnComment={comment.user._id}
                        idUser={user._id}
                        key={comment._id}
                        avatar={comment.user.avatar}
                        name={comment.user.username}
                        date={comment.date}
                        content={comment.content}
                        action={() => {
                          const actualizedComments = [];
                          comments.forEach((com) => {
                            if (com._id != comment._id) {
                              actualizedComments.push(com);
                            }
                          });
                          deleteComment(comment._id);
                          setComments(actualizedComments);
                        }}
                      ></Comment>
                    ))}
                    <Button
                      variant="solid"
                      color={Palette.color_highlight_secondary}
                      background={Palette.color_bg}
                      textAfter="See less"
                      size={4}
                      action={() => setMoreComments(false)}
                    />
                  </div>
                )
              ) : (
                <h6>No comments yet...</h6>
              )
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {start & (index != randomQuestions.length) & !finish ? (
        <div>
          <DivProgress type="CountDown" className="timer" maxValue={initialSeconds} />
          <div>
            {testType == 'featuredtests' ? (
              <div>
                {randomQuestions[index].question
                  .toString()
                  .includes('https://res.cloudinary.com') ? (
                  <div className="questionDiv">
                    <h3>{`${
                      test.question_text[0] == '.' ? '' : test.question_text[0]
                    } `}</h3>
                    <img alt="question" src={randomQuestions[index].question} />
                    <h3>{` ${
                      test.question_text[1] == '.' ? '' : test.question_text[1]
                    }`}</h3>
                  </div>
                ) : (
                  <h3>
                    {`${test.question_text[0] == '.' ? '' : test.question_text[0]} ${
                      randomQuestions[index].question
                    } ${test.question_text[1] == '.' ? '' : test.question_text[1]}`}
                  </h3>
                )}
              </div>
            ) : (
              <div className="questionDiv">
                <h3>{randomQuestions[index].question}</h3>
                <img alt="question" src={randomQuestions[index].question_img} />
              </div>
            )}

            {testType == 'featuredtests' ? (
              <>
                <div className="optionDiv">
                  {randomQuestions[index].options.map((option) =>
                    featuredData
                      .find((item) => item.id == option)
                      [test.answer].toString()
                      .includes('https://res.cloudinary.com') ? (
                      <img
                        key={option}
                        alt="option"
                        src={featuredData.find((item) => item.id == option)[test.answer]}
                        onClick={() => {
                          if (option == randomQuestions[index].id) {
                            setScore((prevScore) => prevScore + 1);
                          }
                          setIndex((prevIndex) => prevIndex + 1);
                        }}
                      />
                    ) : (
                      <div
                        key={option}
                        alt="option"
                        onClick={() => {
                          if (option == randomQuestions[index].id) {
                            setScore((prevScore) => prevScore + 1);
                          }
                          setIndex((prevIndex) => prevIndex + 1);
                        }}
                      >
                        <h4>
                          {featuredData.find((item) => item.id == option)[test.answer]}
                        </h4>
                      </div>
                    ),
                  )}
                </div>

                <ModalTest text="Exit" id={test._id} />
              </>
            ) : (
              <>
                <div className="optionDiv">
                  {randomQuestions[index].options.map((option) =>
                    option.toString().includes('https://res.cloudinary.com')
                      ? option != '' && (
                          <img
                            key={option}
                            alt="option"
                            src={option}
                            onClick={() => {
                              if (option == randomQuestions[index].answer) {
                                setScore((prevScore) => prevScore + 1);
                              }
                              setIndex((prevIndex) => prevIndex + 1);
                            }}
                          />
                        )
                      : option != '' && (
                          <div
                            key={option}
                            alt="option"
                            onClick={() => {
                              if (option == randomQuestions[index].answer) {
                                setScore((prevScore) => prevScore + 1);
                              }
                              setIndex((prevIndex) => prevIndex + 1);
                            }}
                          >
                            <h4>{option}</h4>
                          </div>
                        ),
                  )}
                </div>
                <ModalTest text="Exit" id={test._id} />
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}{' '}
      {index == randomQuestions.length && randomQuestions.length != 0 ? (
        <div>
          <h4>
            Score: {score}/{randomQuestions.length}
          </h4>
          <h4>
            Time: {userMinutes}:{userSeconds}
          </h4>
        </div>
      ) : finish ? (
        <div>
          <h4>Time ran out!</h4>
          <h4>
            Score: {score}/{randomQuestions.length}
          </h4>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TestDetail;
