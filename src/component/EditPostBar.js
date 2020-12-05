import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import EditPostBlock from './EditPostBlock';
import more from '../img/more.png';
import { StyleEditBlock } from './EditBlockCompo';
import DeletePopup from './DeletePopup';

function EditPostBar({ postID, postIssuerID }) {
  const user = useSelector((state) => state.user);
  //click edit
  const [clickEdit, setclickEdit] = useState(false);
  const [isDeletePopupClick, setisDeletePopupClick] = useState(false);
  const [deletePost, setDeletePost] = useState('');

  return (
    <>
      {user && user.uid === postIssuerID && (
        <>
          <div
            style={{ marginLeft: 'auto' }}
            className='editPostBar'
            onClick={() => {
              setclickEdit(!clickEdit);
            }}>
            <img src={more} style={{ width: '15px', height: '15px' }}></img>
          </div>
          {/* {clickEdit ? <EditPostBlock postID={postID} /> : ''} */}
          <StyleEditBlock show={clickEdit}>
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
            <DeletePopup
              setisDeletePopupClick={setisDeletePopupClick}
              isDeletePopupClick={isDeletePopupClick}
              deletePostID={deletePost}
            />
          </StyleEditBlock>
        </>
      )}
    </>
  );
}

EditPostBar.propTypes = {
  postID: PropTypes.string.isRequired,
  postIssuerID: PropTypes.string.isRequired,
  setDeletePost: PropTypes.func,
};

export default EditPostBar;
