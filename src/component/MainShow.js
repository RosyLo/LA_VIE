import React from 'react';
import PropTypes from 'prop-types';
import mainShow from '../style/mainshow.css';

function MainShow() {
  return (
    <div className='mainShowWrap'>
      <div className='mainShow'></div>
    </div>
  );
}

MainShow.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default MainShow;
