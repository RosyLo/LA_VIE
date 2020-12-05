import React from 'react';
import PropTypes from 'prop-types';
import styles from '../style/welcomeshow.css';

function WelcomeShow() {
  return (
    <div className='welcomeShowWrap'>
      <div className='welcomeShow'>
        <div>分享你的</div>
        <div className='welcomeShowTag'>#穿搭</div>
        <div>時尚生活</div>
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
