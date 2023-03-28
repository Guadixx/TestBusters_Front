import './DayTest.css';

import React, { useEffect, useState } from 'react';

import { API } from '../services/API';
import TestCardDayTest from './TestCardDayTest';
const DayTest = () => {
  const [test, setTest] = useState(undefined);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const today = `${year}-${month}-${day}`;
  const [dateTest, setDateTest] = useState(`${year}-${month}-${day}`);
  useEffect(() => {
    API.get(`/daytests/${dateTest}`)
      .then((response) => {
        if (response.status == 200) {
          setTest(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dateTest]);
  return (
    <div className="daytest-div">
      {test != undefined ? (
        <TestCardDayTest test={test.test} creator={test.creator} />
      ) : (
        <h3>Loading...</h3>
      )}
      <div className="daytest-input-date-div">
        <button
          className="daytest-input-button"
          onClick={(ev) => {
            ev.target.parentNode.nextSibling.showPicker();
          }}
        >
          <img
            src="https://res.cloudinary.com/dva9zee9r/image/upload/v1680020531/calendario1_hwy03x.png"
            alt="calendar"
            className="daytest-input-image"
          />
        </button>
        <input
          min="2023-03-26"
          max={today}
          id="inputdate"
          type="date"
          className="daytest-input-date"
          onChange={(ev) => {
            setDateTest(ev.target.value);
          }}
        />
        <h4 className="daytest-input-text">{dateTest}</h4>
      </div>
    </div>
  );
};

export default DayTest;
