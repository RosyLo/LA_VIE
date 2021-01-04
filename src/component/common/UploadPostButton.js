import React, { useState } from 'react';
import UploadPostBlock from './UploadPostBlock';
import { MsgPopup } from './MsgPopup';
import styled from '../../style/popup.module.css';
import styles from '../../style/header.module.css';
import msgPopStyles from '../../style/msgPopWrap.module.css';
import plus from '../../img/plusIcon.png';

function UploadPostButton() {
  const [isUploadPopupClick, setisUploadPopupClick] = useState(false);
  //for new post
  const [isNewPostConfirm, setIsNewPostConfirm] = useState(false);
  return (
    <>
      <div
        className={styles.navIcon}
        onClick={() => {
          setisUploadPopupClick(true);
        }}>
        <img className={styles.storyCirclePlus} src={plus} />
      </div>
      <UploadPostBlock
        setisUploadPopupClick={setisUploadPopupClick}
        isUploadPopupClick={isUploadPopupClick}
        setIsNewPostConfirm={setIsNewPostConfirm}
      />
      {/* EditPostPopup */}
      <MsgPopup
        show={isNewPostConfirm}
        handleClose={() => {
          setIsNewPostConfirm(false);
        }}>
        <div className={msgPopStyles.msgPopWrap}>
          <h2>Upload Successful!</h2>
          <div className={msgPopStyles.buttonWrap}>
            <button
              className={styled.decideButton}
              onClick={() => {
                setIsNewPostConfirm(false);
              }}>
              OK
            </button>
          </div>
        </div>
      </MsgPopup>
    </>
  );
}

export default UploadPostButton;
