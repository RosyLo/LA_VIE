import React from 'react';
import PropTypes from 'prop-types';
import styles from '../style/comment.css';

function Comment({ commentIssuerMessage, commentImage }) {
  return (
    <div className='comment'>
      <img className='commentImage' src={commentImage}></img>
      <div className='commentMessage'>{commentIssuerMessage}</div>
    </div>
  );
}

Comment.propTypes = {
  commentIssuerMessage: PropTypes.string.isRequired,
  commentImage: PropTypes.string.isRequired,
};

export default Comment;
