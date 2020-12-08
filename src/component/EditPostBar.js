import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import EditPostPopup from './EditPostPopup';
import more from '../img/more.png';
import { StyleEditBlock } from './EditBlockCompo';
import DeletePopup from './DeletePopup';

function EditPostBar({ postID, postIssuerID, clickEdit, setclickEdit }) {
  const user = useSelector((state) => state.user);
  //click edit
  const [isEditClick, setisEditClick] = useState(false);
  const [isDeletePopupClick, setisDeletePopupClick] = useState(false);
  // const [deletePost, setDeletePost] = useState('');
  // console.log(postID);
  // console.log(clickEdit);

  return (
    <>
      {user && user.uid === postIssuerID && (
        <>
          <div
            style={{ marginLeft: 'auto' }}
            className='editPostBar'
            onClick={(e) => {
              e.stopPropagation();
              setclickEdit(postID);
            }}>
            <img src={more} style={{ width: '15px', height: '15px' }}></img>
          </div>
          {/* {clickEdit ? <EditPostBlock postID={postID} /> : ''} */}
          {postID === clickEdit ? (
            <StyleEditBlock show={true}>
              <div
                className='editPost'
                onClick={(e) => {
                  setisEditClick(true);
                  e.stopPropagation();
                }}>
                Edit
              </div>
              <div
                className='deletePost'
                onClick={(e) => {
                  // setDeletePost(postID);
                  setisDeletePopupClick(true);
                  e.stopPropagation();
                }}>
                Delete
              </div>
              <EditPostPopup
                setisEditClick={setisEditClick}
                isEditClick={isEditClick}
                editPostID={postID}
              />
              <DeletePopup
                setisDeletePopupClick={setisDeletePopupClick}
                isDeletePopupClick={isDeletePopupClick}
                deletePostID={postID}
              />
            </StyleEditBlock>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
}

EditPostBar.propTypes = {
  postID: PropTypes.string.isRequired,
  postIssuerID: PropTypes.string.isRequired,
  setDeletePost: PropTypes.func,
  setclickEdit: PropTypes.func,
  clickEdit: PropTypes.string,
};

export default EditPostBar;
