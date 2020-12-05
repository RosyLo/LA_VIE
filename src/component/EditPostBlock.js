import { React, useState } from 'react';
import PropTypes from 'prop-types';
// import 'post.module.css';
import DeletePopup from './DeletePopup';

function EditPostBlock({ postID }) {
  const [isDeletePopupClick, setisDeletePopupClick] = useState(false);
  const [deletePost, setDeletePost] = useState('');
  return (
    <>
      <div className='editPostBlock'>
        <div
          className='editPost'
          onClick={() => {
            // setDeletePost('');
          }}>
          Edit
        </div>
        <div
          className='deletePost'
          onClick={() => {
            setDeletePost(postID);
            setisDeletePopupClick(true);
          }}>
          Delete
        </div>

        <div className='checktComments'>Comments</div>
      </div>
      <DeletePopup
        setisDeletePopupClick={setisDeletePopupClick}
        isDeletePopupClick={isDeletePopupClick}
        deletePostID={postID}
      />
    </>
  );
}
EditPostBlock.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default EditPostBlock;
