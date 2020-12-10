import React from 'react';
import PropTypes from 'prop-types';
import Heart from './Heart';
import styles from '../style/comment.module.css';

function Comment({ comment }) {
  const { postIssuer, commentIssuerMessage } = comment;
  return (
    <div className={styles.comment}>
      <img className={styles.commentImage} src={postIssuer.postIssuerImage}></img>
      <p>
        <span className={styles.postIssuerName}>{postIssuer.postIssuerName}</span>
        <span>{commentIssuerMessage}</span>
      </p>
      <div className={styles.commentLike}>
        <Heart id={comment.commentID} likes={comment.likeIssuerID} isfrom='comment' />
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
