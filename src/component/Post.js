import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Post(props) {
  console.log(props);
  return (
    <div key={props.postID} className='post'>
      <div className='postHeader'>
        <div className='postProfileImage'></div>
        <div className='postProfileName'>{props.postIssuer.postIssuerName}</div>
      </div>
      <img className='photo' src={props.postImage.postImageLink}></img>
      <div className='postInteraction'>
        <div className='postProfileImage'></div>
      </div>
      <div className='PostComments'>
        查看留言...
        <div className='separater'></div>
      </div>
      <div className='commenting'>
        <input></input>
      </div>
    </div>
  );
}

Post.propTypes = {
  postID: PropTypes.string,
  profileMessage: PropTypes.string.isRequired,
  postIssuerName: PropTypes.string.isRequired,
  postImage: PropTypes.shape({
    postImageLink: PropTypes.string.isRequired,
  }),
  postIssuer: PropTypes.shape({
    postIssuerName: PropTypes.string.isRequired,
  }),
};

export default Post;
