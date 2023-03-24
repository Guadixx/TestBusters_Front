/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './TestDetail.css';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; /*  useLocation, */

import useLocalStorage from '../customHooks/useLocalStorage';
import { API } from '../services/API';
import randomArray from '../services/RandomArray';
import Palette from '../styles/Palette';
import Button from '../ui/Button';
import DivProgress from '../ui/DivProgress';

const TestDetail = () => {
  const testId = useParams().id;
  const userId = JSON.parse(useLocalStorage('get', 'user'))._id;
  //const location = useLocation();
  //const testType = location.state.testType;
  //const testType = 'generictests';
  const testType = 'featuredtests';
  const user = {
    userId: userId,
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
  useEffect(() => {
    API.patch(`/${testType}/${testId}`, user)
      .then((res) => {
        if (res.status === 200) {
          setTest(res.data.test);
          if (testType == 'featuredtests') {
            const data_type = res.data.test.data_type;
            const value_1 =
              res.data.test.filter_1.value != 'none' ? res.data.test.filter_1.value : '';
            const value_2 =
              res.data.test.filter_2.value != 'none' ? res.data.test.filter_1.value : '';
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
      <h1>{test != {} && test.title}</h1>
      <p>{test.description != undefined && test.description.split('/')[0]}</p>
      <h4>Creator {test.creator != undefined && test.creator.username}</h4>
      {!start && (
        <Button
          action={() => {
            handleStart();
          }}
          variant="border"
          color={Palette.color_highlight_primary}
          textAfter="Play"
          size={5}
        />
      )}
      {start & (index != randomQuestions.length) & !finish ? (
        <div>
          <DivProgress type="CountDown" className="timer" maxValue={initialSeconds} />
          <div>
            {testType == 'featuredtests' ? (
              <div>
                {randomQuestions[index].question.includes(
                  'https://res.cloudinary.com',
                ) ? (
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
              <div className="optionDiv">
                {randomQuestions[index].options.map((option) =>
                  featuredData
                    .find((item) => item.id == option)
                    [test.answer].includes('https://res.cloudinary.com') ? (
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
            ) : (
              <div className="optionDiv">
                {randomQuestions[index].options.map((option) =>
                  option.includes('https://res.cloudinary.com')
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
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
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
/* answer
: 
"flag"
average
: 
[150.639]
banner
: 
"https://res.cloudinary.com/dva9zee9r/image/upload/v1679593782/testbuster/j2a80j9dpsi5mivkelpk.jpg"
comments
: 
[]
comments_enabled
: 
true
created
: 
"2023-03-23T17:49:42.827Z"
creator
: 
{_id: '641994c6df2407973dd20901', username: 'rgrivas9', admin: true, email: 'rafaelgrcrvs@gmail.com', password: '$2b$10$LmnUNss.BuOuguaPOjW7O.DkNLqD2ZObHn5uWIX2xZL8QyCAGJTmG', …}
data_type
: 
"countries"
description
: 
"You have 10 minutes to guess every flag of each state/6"
favorites
: 
[]
filter_1
: 
{key: 'none', value: 'none'}
filter_2
: 
{key: 'none', value: 'none'}
filters
: 
[]
first
: 
[{…}]
question
: 
"name"
question_text
: 
(2) ['Which one is the flag of', '?']
random
: 
true
rating
: 
(2) [5, 1]
second
: 
[]
test_type
: 
"featured"
third
: 
[]
thumbnail
: 
"https://res.cloudinary.com/dva9zee9r/image/upload/v1679593782/testbuster/enrdhfo5s7ov5kgmq0p7.jpg"
time
: 
"10:00"
times_played
: 
1
title
: 
"Guess every country Flag"
updated
: 
"2023-03-23T19:00:48.690Z"
__v
: 
0
_id
: 
"641c913672efd827f115a53a" */
