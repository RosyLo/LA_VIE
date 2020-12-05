import React from 'react';
import PropTypes from 'prop-types';
import Heart from './Heart';
import styles from '../style/comment.css';

function Comment({ comment }) {
  const { postIssuer, commentIssuerMessage } = comment;
  return (
    <div className='comment'>
      <img className='commentImage' src={postIssuer.postIssuerImage}></img>
      <div className='commentMessage'>{commentIssuerMessage}</div>
      <div className='commentLike'>
        <Heart id={comment.commentID} likes={comment.likeIssuerID} isfrom='comment' />
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
