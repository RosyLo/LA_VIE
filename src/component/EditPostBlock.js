import { React, useState } from 'react';
import PropTypes from 'prop-types';
// import 'post.module.css';
import DeletePopup from './DeletePopup';
import EditPostPopup from './EditPostPopup';

function EditPostBlock({ postID }) {
  const [isDeletePopupClick, setisDeletePopupClick] = useState(false);
  const [isEditPopupClick, setisEditPopupClick] = useState(false);
  const [editPost, setEditPost] = useState('');
  // const [deletePost, setDeletePost] = useState('');
  return (
    <>
      <div className='editPostBlock'>
        <div
          className='editPost'
          onClick={() => {
            setEditPost(postID);
            setisEditPopupClick(true);
          }}>
          Edit
        </div>
        <div
          className='deletePost'
          onClick={() => {
            setDeletePost(postID);
            // setisDeletePopupClick(true);
          }}>
          Delete
        </div>

        <div className='checktComments'>Comments</div>
      </div>
      <EditPostPopup
        setisEditPopupClick={setisEditPopupClick}
        isEditPopupClick={isEditPopupClick}
        editPostID={postID}
      />
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
