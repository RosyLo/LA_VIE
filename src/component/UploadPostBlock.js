import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../redux/actions';
import { StyleModal } from './PopupModal';
import styles from '../style/popup.module.css';
import Post from './Post';
import ChooseTags from './ChooseTags';
import { nanoid } from 'nanoid';
// import { tagOptions } from '../utils/data';

function UploadPostBlock({ setisUploadPopupClick, isUploadPopupClick }) {
  const [uploadViewStage, setUploadViewStage] = useState(0);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
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
    setImageURL(imageURL);
  };

  //選擇照片
  const choosePic = (
    <div className={styles.rightModel}>
      <div className={styles.decideBlock}>
        <h3>Let me Think...</h3>
        <label htmlFor='uploadPictureButton' className={styles.uploadButton}>
          Choose
        </label>
        <input type='file' id='uploadPictureButton' onChange={handlePictureChange} />
      </div>

      {imageURL ? (
        <button
          className={styles.decideButton}
          onClick={() => {
            setUploadViewStage(1);
          }}>
          Next
        </button>
      ) : (
        ''
      )}
    </div>
  );

  //msg & tag
  const [newMsg, setNewMsg] = useState('');
  const [newTag, setNewTag] = useState({});

  // Msg
  const handleMsgChange = (e) => {
    setNewMsg(e.target.value);
  };

  const writeMsgTag = (
    <div className={styles.rightModel}>
      <textarea
        type='text'
        id='postMsg'
        name='postMsg'
        cols='20'
        rows='13'
        placeholder='This is my Fashion Declare!'
        onChange={handleMsgChange}></textarea>
      <ChooseTags setNewTag={setNewTag} />
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
        ''
      )}
    </div>
  );

  //最終上傳
  const uploadPic = (
    <div className={styles.rightModel}>
      <div className={styles.decideBlock}>
        <h3>Share!</h3>
        <p>Enrich lives with fashion!</p>
        <button
          className={styles.decideButton}
          onClick={(e) => {
            e.preventDefault();
            alert('upload success');
            dispatch(addPost(image, newMsg, newTag));
            setisUploadPopupClick(false);
            setImageURL(null);
            setUploadViewStage(0);
          }}>
          Upload
        </button>
        <button className={styles.decideButton} onClick={() => setUploadViewStage(1)}>
          Back
        </button>
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

  return (
    <StyleModal
      show={isUploadPopupClick}
      handleClose={() => {
        setisUploadPopupClick(false);
      }}>
      <div className={styles.modelWrap}>
        <div className={styles.topModel}></div>
        <div className={styles.buttonModal}>
          <div className={styles.leftModel}>
            <Post post={post} isFromUpload={true} />
          </div>
          {view}
        </div>
      </div>
    </StyleModal>
  );
}

UploadPostBlock.propTypes = {
  isUploadPopupClick: PropTypes.bool.isRequired,
  setisUploadPopupClick: PropTypes.func.isRequired,
};

export default UploadPostBlock;
