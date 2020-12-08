import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { editPost } from '../redux/actions';
import { deletePost } from '../redux/actions';
import styles from '../style/popup.module.css';
import { StyleModal } from './PopupModal';
import { nanoid } from 'nanoid';

function EditPostPopup({ editPostID, setisEditClick, isEditClick }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const editpost = posts.find((post) => post.postID === editPostID);
  console.log(editpost);
  const [uploadViewStage, setUploadViewStage] = useState(0);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(editpost.postImage.postImageLink);
  const user = useSelector((state) => state.user);
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
  };

  const handlePictureChange = (e) => {
    setImage(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setImageURL(imageURL);
  };

  const choosePic = (
    <div className={styles.rightModel}>
      <div className={styles.decideBlock}>
        <h3>Let me Think...</h3>
        <input
          type='file'
          id='uploadPictureButton'
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={handlePictureChange}
        />
      </div>

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
            dispatch(editPost(editPostID, image));
            setisEditClick(false);
            setImageURL(null);
            setUploadViewStage(0);
          }}>
          Upload
        </button>
        <button
          className={styles.decideButton}
          onClick={(e) => {
            setUploadViewStage(0);
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
            <Post post={post} />
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
};

export default EditPostPopup;
