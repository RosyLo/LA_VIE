import React from 'react';
import PropTypes from 'prop-types';
import styles from '../style/welcomeshow.css';

function WelcomeShow() {
  return (
    <div className='welcomeShowWrap'>
      <div className='welcomeShow'>
        <div></div>
        <div className='welcomeShowTag'></div>
        <div></div>
      </div>
      <div className='circleWrap'>
        <div className='circle' style={{ background: 'rgb(187, 140, 47)' }}></div>
        <div className='circle'></div>
        <div className='circle'></div>
      </div>
    </div>
  );
}

WelcomeShow.propTypes = {};

export default WelcomeShow;
