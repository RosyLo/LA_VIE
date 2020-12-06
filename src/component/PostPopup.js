import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { deletePost } from '../redux/actions';
import styles from '../style/popup.module.css';
import { StyleModal } from './PopupModal';

function PostPopup({ clickPost, setisPostClick, isPostClick }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const clickpost = posts.find((post) => post.postID === clickPost);
  console.log(clickPost);
  console.log(clickpost);
  console.log(setisPostClick);
  console.log(isPostClick);

  return (
    <StyleModal
      show={isPostClick}
      handleClose={() => {
        setisPostClick(false);
      }}>
      <div className={styles.modelWrap}>
        <div className={styles.topModal}></div>
        <div className={styles.leftModel}>
          {/* {clickpost ? (
          <img className={styles.postPicture} src={clickpost.postImage.postImageLink}></img>
        ) : (
          ''
        )} */}
        </div>

        <div className={styles.rightModel}>
          <div className={styles.decideBlock}>
            <h3>Think Twice!</h3>
            <p>Say GoodBye to the Story?</p>
            <button
              className={styles.decideButton}
              onClick={() => {
                setisDeletePopupClick(false);
              }}>
              Back
            </button>
            <button
              className={styles.decideButton}
              onClick={() => {
                dispatch(deletePost(deletepost, setisDeletePopupClick));
              }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </StyleModal>
  );
}

PostPopup.propTypes = {
  clickPost: PropTypes.string.isRequired,
  setisPostClick: PropTypes.func.isRequired,
  isPostClick: PropTypes.bool.isRequired,
};

export default PostPopup;
