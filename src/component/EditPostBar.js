import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import EditPostPopup from './EditPostPopup';
import more from '../img/more.png';
import { StyleEditBlock } from './EditBlockCompo';
import DeletePopup from './DeletePopup';
import { MsgPopup } from './MsgPopup';
import styled from '../style/popup.module.css';
import msgPopStyles from '../style/msgPopWrap.module.css';

function EditPostBar({
  postID,
  postIssuerID,
  clickEdit,
  setclickEdit,
  isDeletePopup,
  setIsDeletePopup,
  setisPostClick,
}) {
  const user = useSelector((state) => state.user);
  //click edit
  const [isEditClick, setisEditClick] = useState(false);
  const [isEditBlockClick, setIsEditBlockClick] = useState(false);
  const [isDeletePopupClick, setisDeletePopupClick] = useState(false);
  const [isUploadPopup, setIsUploadPopup] = useState(false);
  return (
    <>
      {isDeletePopup}
      {user && user.uid === postIssuerID && (
        <>
          <div
            style={{ marginLeft: 'auto', position: 'relative' }}
            className='editPostBar'
            onClick={(e) => {
              e.stopPropagation();
              setclickEdit(postID);
              setIsEditBlockClick(!isEditBlockClick);
            }}>
            <img src={more} style={{ width: '12px', height: '12px', cursor: 'pointer' }}></img>

            {postID === clickEdit ? (
              <StyleEditBlock show={isEditBlockClick}>
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
                    setisDeletePopupClick(true);
                    e.stopPropagation();
                  }}>
                  Delete
                </div>
                {isEditClick ? (
                  <EditPostPopup
                    setisEditClick={setisEditClick}
                    isEditClick={isEditClick}
                    editPostID={postID}
                    setIsUploadPopup={setIsUploadPopup}
                  />
                ) : (
                  ''
                )}
                {isDeletePopupClick ? (
                  <DeletePopup
                    setisDeletePopupClick={setisDeletePopupClick}
                    isDeletePopupClick={isDeletePopupClick}
                    deletePostID={postID}
                    setIsDeletePopup={setIsDeletePopup}
                    setisPostClick={setisPostClick}
                  />
                ) : (
                  ''
                )}
              </StyleEditBlock>
            ) : (
              ''
            )}
          </div>
        </>
      )}
      {/* EditPostPopup */}
      <MsgPopup
        show={isUploadPopup}
        handleClose={() => {
          setisUploadPopup(false);
        }}>
        <div className={msgPopStyles.msgPopWrap}>
          <h2>Update Successful!</h2>
          <div className={msgPopStyles.buttonWrap}>
            <button
              className={styled.decideButton}
              onClick={() => {
                setIsUploadPopup(false);
              }}>
              OK
            </button>
          </div>
        </div>
      </MsgPopup>
    </>
  );
}

EditPostBar.propTypes = {
  postID: PropTypes.string.isRequired,
  postIssuerID: PropTypes.string.isRequired,
  setDeletePost: PropTypes.func,
  setclickEdit: PropTypes.func,
  setisPostClick: PropTypes.func,
  clickEdit: PropTypes.string,
  isDeletePopup: PropTypes.bool,
  setIsDeletePopup: PropTypes.func,
};

export default EditPostBar;
