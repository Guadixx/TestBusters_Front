/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './TestDetail.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useLocalStorage from '../customHooks/useLocalStorage';
import { API } from '../services/API';
import randomArray from '../services/RandomArray';
import Palette from '../styles/Palette';
import Button from '../ui/Button';
import DivProgress from '../ui/DivProgress';
const TestDetail = () => {
  const testId = useParams().id;
  const userId = JSON.parse(useLocalStorage('get', 'user'))._id;
  //const testType = location.state.testType;
  const testType = 'featuredtests';
  const user = {
    userId: userId,
  };
  const [test, setTest] = useState({});
  const [featuredData, setFeaturedData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
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
            API.get(`/${data_type}?${key_1}=${value_1}&${key_2}=${value_2}`)
              .then((res) => {
                if (res.status === 200) {
                  let index = 0;
                  res.data.forEach((data) => {
                    index++;
                    data.id = index;
                  });
                  setFeaturedData(res.data);
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
    if (testType == 'featuredtests' && test != {}) {
      setQuestions(
        featuredData.map((item) => ({
          question: item[test.question],
          answer: item[test.answer],
          id: item.id,
          options: randomArray(
            2,
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
    if (testType == 'generictests' && test != {}) {
      setQuestions(
        test.data.map((item) => ({
          question: item.question,
          answer: item.answer,
          question_img: item.question_img,
          id: item.id,
          option_1: item.option_1,
          option_2: item.option_2,
          option_3: item.option_3,
          option_4: item.option_4,
          option_5: item.option_5,
          type: item.type,
        })),
      );
    }
  }, [test]);
  useEffect(() => {
    if (test.random && questions != []) {
      const random = randomArray(1, questions.length + 1, questions.length, 0);
      const newQuestions = [];
      random.forEach((number) => {
        newQuestions.push(questions.find((question) => question.id == number));
      });
      setRandomQuestions(newQuestions);
    }
  }, [questions]);
  return (
    <div>
      <h1>{test != {} && test.title}</h1>
      <p>{test != {} && test.description}</p>
      <h4>Creator {test.creator != undefined && test.creator.username}</h4>
      {!start && (
        <Button
          action={() => {
            setStart(true);
            randomQuestions.forEach((question) => {
              question.options[Math.round(Math.random() * 5)] = question.id;
              let index = 0;
              question.options.forEach((number) => {
                if (number == 0) {
                  question.options[index] = 58;
                }
                index++;
              });
            });
          }}
          variant="border"
          color={Palette.color_highlight_primary}
          textAfter="Play"
          size={5}
        />
      )}
      {start & (index != randomQuestions.length) && (
        <div>
          <DivProgress
            type="CountDown"
            className="timer"
            maxValue={
              parseInt(test.time.split(':')[0] * 60) + parseInt(test.time.split(':')[1])
            }
          />
          <div>
            <h3>
              {`${test.question_text[0]} ${randomQuestions[index].question} ${test.question_text[1]}`}
            </h3>
            <div>
              {randomQuestions[index].options.map((option) => (
                <img
                  key={option}
                  alt="flag"
                  src={featuredData.find((item) => item.id == option).flag}
                  onClick={() => {
                    if (option == randomQuestions[index].id) {
                      setScore((prevScore) => prevScore + 1);
                    }
                    setIndex((prevIndex) => prevIndex + 1);
                    console.log(score);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
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
