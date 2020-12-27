import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../redux/actions';
import { StyleModal } from './PopupModal';
import styles from '../style/popup.module.css';
import styled from '../style/editpostpopup.module.css';
import Post from './Post';
import ChooseTags from './ChooseTags';
import { nanoid } from 'nanoid';

// import { tagOptions } from '../utils/data';

function UploadPostBlock({ setisUploadPopupClick, isUploadPopupClick, setIsNewPostConfirm }) {
  const [uploadViewStage, setUploadViewStage] = useState(0);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  // const [test, settest] = useState('o');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const post = {
    postID: 'postID' + nanoid(),
    postImage: { postImageID: 'postImageID_' + nanoid(), postImageLink: imageURL },
    postIssuer: {
      postIssuerID: user.uid,
      postIssuerImage: user.photoURL,
      postIssuerName: user.displayName,
    },
    postMessage: '',
    postTag: 'YourTag',
    postLikes: [],
  };

  const handlePictureChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    console.log(imageURL);
    setImageURL(imageURL);
    // settest('x');
  };

  //選擇照片
  const uploadPicID = nanoid();
  const choosePic = (
    <div className={styles.rightModel}>
      <div className={styled.decideBlock} style={{ margin: '0px 0px 50px 0px' }}>
        <div className={styles.blockTitle}>
          Pick the Photo
          {/* {test} */}
        </div>
        <div className={styled.decideButtonBlock}>
          <label htmlFor={uploadPicID} className={styles.uploadButton}>
            Choose
          </label>
          <input type='file' id={uploadPicID} onChange={handlePictureChange} />

          {imageURL ? (
            <button
              className={styles.decideButton}
              onClick={() => {
                setUploadViewStage(1);
              }}>
              Next
            </button>
          ) : (
            <button className={styles.decideButtonVag}> Next</button>
          )}
        </div>
      </div>
    </div>
  );

  //msg & tag
  const [newMsg, setNewMsg] = useState('');
  const [newTag, setNewTag] = useState(null);
  // Msg
  const handleMsgChange = (e) => {
    setNewMsg(e.target.value);
  };

  const writeMsgTag = (
    <div className={styled.postPopupRightModel}>
      <div className={styled.decideBlockMsg}>
        <textarea
          className={styled.postMsgInput}
          type='text'
          id='postMsg'
          name='postMsg'
          cols='20'
          rows='13'
          value={newMsg}
          placeholder='This is my Fashion Declare!'
          onChange={handleMsgChange}></textarea>
        <div className={styled.searchButtonBlock}>
          <div className={styled.postSearch}>
            <ChooseTags newTag={newTag} setNewTag={setNewTag} />
          </div>
          <div className={styles.decideButtonWrap}>
            <button className={styles.decideButton} onClick={() => setUploadViewStage(0)}>
              Back
            </button>
            {newMsg && newTag ? (
              <button
                className={styles.decideButton}
                onClick={(e) => {
                  setUploadViewStage(2);
                  e.stopPropagation();
                }}>
                Next
              </button>
            ) : (
              <button className={styles.decideButtonVag}> Next</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  //最終上傳
  const uploadPic = (
    <div className={styles.rightModel}>
      <div className={styles.decideBlock} style={{ margin: '0px 0px 50px 0px' }}>
        <div className={styles.blockTitle}>Share your Story!</div>
        <div className={styled.decideButtonBlock}>
          <button className={styles.decideButton} onClick={() => setUploadViewStage(1)}>
            Back
          </button>
          <button
            className={styles.decideButton}
            onClick={(e) => {
              e.preventDefault();
              dispatch(addPost(image, newMsg, newTag));
              setisUploadPopupClick(false);
              setImageURL('hihi');
              setUploadViewStage(0);
              setIsNewPostConfirm(true);
            }}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );

  let view = '';
  if (uploadViewStage === 0) {
    view = choosePic;
  } else if (uploadViewStage === 1) {
    view = writeMsgTag;
  } else if (uploadViewStage === 2) {
    view = uploadPic;
  }
  console.log(imageURL);
  return (
    <>
      <StyleModal
        show={isUploadPopupClick}
        handleClose={() => {
          setisUploadPopupClick(false);
        }}>
        <div className={styles.modelWrap}>
          <div className={styles.topModel}></div>
          <div className={styles.buttonModal}>
            <div className={styles.leftModel}>
              <Post post={post} isFromUpload={true} newTag={newTag} />
            </div>
            {view}
          </div>
        </div>
      </StyleModal>
    </>
  );
}

UploadPostBlock.propTypes = {
  isUploadPopupClick: PropTypes.bool.isRequired,
  setisUploadPopupClick: PropTypes.func.isRequired,
  setIsNewPostConfirm: PropTypes.func.isRequired,
};

export default UploadPostBlock;
