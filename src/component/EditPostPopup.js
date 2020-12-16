import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { editPost } from '../redux/actions';
import { deletePost } from '../redux/actions';
import styles from '../style/popup.module.css';
import { StyleModal } from './PopupModal';
import { nanoid } from 'nanoid';
import ChooseTags from './ChooseTags';

function EditPostPopup({ editPostID, setisEditClick, isEditClick, editStory, setEditStory }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const editpost = posts.find((post) => post.postID === editPostID);
  const [uploadViewStage, setUploadViewStage] = useState(0);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(editpost.postImage.postImageLink);
  const post = {
    postID: editpost.postID,
    postImage: {
      postImageID: editpost.postImage.postImageID,
      postImageLink: imageURL,
    },
    postIssuer: {
      postIssuerID: editpost.postIssuer.postIssuerID,
      postIssuerImage: editpost.postIssuer.postIssuerImage,
      postIssuerName: editpost.postIssuer.postIssuerName,
    },
    postMessage: editpost.postMessage,
    postTag: editpost.postTag,
    postLikes: editpost.postLikes,
    postTime: editpost.postTime,
  };

  const handlePictureChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setImageURL(imageURL);
  };

  const choosePic = (
    <div className={styles.rightModel}>
      <div className={styles.decideBlock}>
        <h3>Let me Think...</h3>
        <label htmlFor='editPictureButton' className={styles.uploadButton}>
          Choose
        </label>
        <input type='file' id='editPictureButton' onChange={handlePictureChange} />
        {imageURL ? (
          <button
            className={styles.decideButton}
            onClick={(e) => {
              setUploadViewStage(1);
              e.stopPropagation();
            }}>
            Next
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
  //msg & tag
  const [newMsg, setNewMsg] = useState(post.postMessage);
  const [newTag, setNewTag] = useState(post.postTag);

  // Msg
  const handleMsgChange = (e) => {
    setNewMsg(e.target.value);
  };

  const writeMsgTag = (
    <div className={styles.postPopupRightModel}>
      <textarea
        className={styles.postMsgInput}
        type='text'
        id='postMsg'
        name='postMsg'
        cols='20'
        rows='13'
        value={newMsg}
        placeholder={newMsg}
        onChange={handleMsgChange}></textarea>
      <div className={styles.postSearch}>
        <ChooseTags newTag={newTag} setNewTag={setNewTag} />
      </div>
      <button className={styles.decideButton} onClick={() => setUploadViewStage(0)}>
        Back
      </button>
      {newMsg && newTag ? (
        <button
          className={styles.decideButton}
          onClick={() => {
            setUploadViewStage(2);
          }}>
          Next
        </button>
      ) : (
        ''
      )}
    </div>
  );

  const uploadPic = (
    <div className={styles.rightModel}>
      <div className={styles.decideBlock}>
        <h3>Share!</h3>
        <p>Enrich lives with fashion!</p>
        <button
          className={styles.decideButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            alert('upload success');
            dispatch(editPost(editPostID, image, imageURL, newMsg, newTag, post.postTime));
            setisEditClick(false);
            setImageURL(null);
            setUploadViewStage(0);
          }}>
          Upload
        </button>
        <button
          className={styles.decideButton}
          onClick={(e) => {
            setUploadViewStage(1);
            e.stopPropagation();
          }}>
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
      show={isEditClick}
      handleClose={() => {
        setisEditClick(false);
      }}>
      <div className={styles.modelWrap}>
        <div className={styles.topModel}></div>
        <div className={styles.buttonModal}>
          <div className={styles.leftModel}>
            <Post post={post} isFromEdit={true} />
          </div>
          {view}
        </div>
      </div>
    </StyleModal>
  );
}

EditPostPopup.propTypes = {
  editPostID: PropTypes.string.isRequired,
  setisEditClick: PropTypes.func.isRequired,
  isEditClick: PropTypes.bool.isRequired,
  editStory: PropTypes.string.isRequired,
  setEditStory: PropTypes.object.isRequired,
};

export default EditPostPopup;
