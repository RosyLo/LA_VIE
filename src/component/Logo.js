import React from 'react';
import PropTypes from 'prop-types';
import styles from '../style/comment.css';

function Logo({ comment }) {
  return <div className='logo'>logo</div>;
}

Logo.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Logo;
