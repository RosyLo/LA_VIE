import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import EditPostPopup from '../common/EditPostPopup';
import { BarPopup } from '../common/BarPopup';
import DeletePopup from '../common/DeletePopup';
import { MsgPopup } from '../common/MsgPopup';
import styled from '../../style/popup.module.scss';
import msgPopStyles from '../../style/msgPopWrap.module.css';
import more from '../../img/more.svg';

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
            <img src={more} style={{ width: '17px', height: '17px', cursor: 'pointer' }} />

            {postID === clickEdit && (
              <BarPopup show={isEditBlockClick} top='20px' right='0px'>
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
                {isEditClick && (
                  <EditPostPopup
                    setisEditClick={setisEditClick}
                    isEditClick={isEditClick}
                    editPostID={postID}
                    setIsUploadPopup={setIsUploadPopup}
                  />
                )}
                {isDeletePopupClick && (
                  <DeletePopup
                    setisDeletePopupClick={setisDeletePopupClick}
                    isDeletePopupClick={isDeletePopupClick}
                    deletePostID={postID}
                    setIsDeletePopup={setIsDeletePopup}
                    setisPostClick={setisPostClick}
                  />
                )}
              </BarPopup>
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
