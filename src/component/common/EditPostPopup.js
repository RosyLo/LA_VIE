import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../post/Post';
import ChooseTags from './ChooseTags';
import { StyleModal } from '../common/PopupModal';
import { editPost } from '../../redux/actions/postAction';
import styles from '../../style/popup.module.scss';
import styled from '../../style/editpostpopup.module.scss';

function EditPostPopup({ editPostID, setisEditClick, isEditClick, setIsUploadPopup }) {
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
    setImage(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setImageURL(imageURL);
  };

  const choosePic = (
    <div className={styles.rightModel}>
      <div className={styled.decideBlock}>
        <div className={styles.blockTitle}>Pick the Photo</div>
        <div className={styled.decideButtonBlock}>
          <label htmlFor='editPictureButton' className={styles.uploadButton}>
            Choose
          </label>
          <input type='file' id='editPictureButton' onChange={handlePictureChange} />
          {imageURL && (
            <button
              className={styles.decideButton}
              onClick={(e) => {
                setUploadViewStage(1);
                e.stopPropagation();
              }}>
              Next
            </button>
          )}
        </div>
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
          placeholder={newMsg}
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
                onClick={() => {
                  setUploadViewStage(2);
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

  const uploadPic = (
    <div className={styles.rightModel}>
      <div className={styles.decideBlock}>
        <div className={styles.blockTitle}>Share your Story!</div>
        <div className={styled.decideButtonBlock}>
          <button
            className={styles.decideButton}
            onClick={(e) => {
              setUploadViewStage(1);
              e.stopPropagation();
            }}>
            Back
          </button>
          <button
            className={styles.decideButton}
            onClick={(e) => {
              setIsUploadPopup(true);
              e.preventDefault();
              e.stopPropagation();
              useDispatch(editPost(editPostID, image, imageURL, newMsg, newTag, setIsUploadPopup));
              setisEditClick(false);
              setImageURL(null);
              setUploadViewStage(0);
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

  return (
    <>
      <StyleModal
        show={isEditClick}
        handleClose={() => {
          setisEditClick(false);
        }}>
        <div className={styles.modelWrap}>
          <div className={styles.topModel}></div>
          <div className={styled.buttonModal}>
            <div className={styles.leftModel}>
              <Post post={post} isFromEdit={true} newTag={newTag} />
            </div>
            {view}
          </div>
        </div>
      </StyleModal>
    </>
  );
}

EditPostPopup.propTypes = {
  editPostID: PropTypes.string.isRequired,
  setisEditClick: PropTypes.func.isRequired,
  setIsUploadPopup: PropTypes.func.isRequired,
  isEditClick: PropTypes.bool.isRequired,
  editStory: PropTypes.string.isRequired,
  setEditStory: PropTypes.object.isRequired,
};

export default EditPostPopup;
