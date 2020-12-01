import { React, useState } from 'react';
import PropTypes from 'prop-types';
import '../style/post.css';
import DeletePopup from './DeletePopup';

function EditPostBlock({ postID, setDeletePost }) {
  return (
    <>
      <div className='editPostBlock'>
        <div
          className='editPost'
          onClick={() => {
            setDeletePost('');
          }}>
          Edit
        </div>
        <div
          className='deletePost'
          onClick={() => {
            setDeletePost(postID);
          }}>
          Delete
        </div>
        <div className='checktComments'>Comments</div>
      </div>
    </>
  );
}
EditPostBlock.propTypes = {
  postID: PropTypes.string.isRequired,
  setDeletePost: PropTypes.func.isRequired,
};

export default EditPostBlock;
