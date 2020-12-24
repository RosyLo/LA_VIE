import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../style/nomatch.css';
import styles from '../style/popup.module.css';

import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

function NoMatch() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className='noMatch'>
        <div className='noMatchTitle'> I wanna go to : </div>
        <button
          className='noMatchBtn'
          onClick={() => {
            window.location = './welcome';
          }}>
          Welcome
        </button>
        <button
          className='noMatchBtn'
          onClick={() => {
            window.location = './main';
          }}>
          Main
        </button>
        <button
          className='noMatchBtn'
          onClick={() => {
            window.location = `./profile?id=${user.uid}`;
          }}>
          Profile
        </button>
      </div>
    </>
  );
}

export default NoMatch;
