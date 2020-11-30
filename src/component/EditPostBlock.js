import { React, useState } from 'react';
import PropTypes from 'prop-types';
import '../style/post.css';

function EditPostBlock({ postID }) {
  return (
    <div className='editPostBlock'>
      <div className='editPost'>Edit</div>
      <div
        className='deletePost'
        onClick={() => {
          deletePost(postID);
        }}>
        Delete
      </div>
      <div className='checktComments'>Comments</div>
    </div>
  );
}
EditPostBlock.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default EditPostBlock;
