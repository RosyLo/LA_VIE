import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../redux/actions';
import { StyleModal } from './PopupModal';
import styles from '../style/popup.module.css';
import Post from './Post';
import { nanoid } from 'nanoid';

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
    postMessage: 'rosy',
    postTag: 'rosy',
    postLikeIssuerId: [],
    postLikes: [],
  };

  const handlePictureChange = (e) => {
    setImage(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setImageURL(imageURL);
  };

  const choosePic = (
    <div className={styles.rightModel}>
      <div className='uploadPostButton'>
        <input
          type='file'
          id='uploadPictureButton'
          // value='uploadPicture'
          onChange={handlePictureChange}
        />
      </div>
      <div
        onClick={() => {
          setUploadViewStage(1);
        }}>
        Next
      </div>
    </div>
  );

  const uploadPic = (
    <div className={styles.rightModel}>
      <button
        onClick={(e) => {
          e.preventDefault();
          alert('upload success');
          dispatch(addPost(image));
          setisUploadPopupClick(false);
        }}>
        Upload
      </button>
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
      show={isUploadPopupClick}
      handleClose={() => {
        setisUploadPopupClick(false);
      }}>
      <div className={styles.leftModel}>
        <Post post={post} />
      </div>
      {view}
    </StyleModal>
  );
}

UploadPostBlock.propTypes = {
  isUploadPopupClick: PropTypes.bool.isRequired,
  setisUploadPopupClick: PropTypes.func.isRequired,
};

export default UploadPostBlock;
