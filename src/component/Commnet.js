import { React, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../style/comment.css';

const Comment = (props) => {
  console.log(props);
  return (
    <div className='commentWrap'>
      <img src={props.commentIssuerImage}></img>
      <div>{props.commentIssuerMessage}hi</div>
    </div>
  );
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  commentIssuerMessage: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired,
  commentIssuerImage: PropTypes.string.isRequired,
};

export default Comment;
