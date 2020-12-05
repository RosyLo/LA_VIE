import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { deletePost } from '../redux/actions';
import styles from '../style/popup.module.css';
import { StyleModal } from './PopupModal';

function DeletePopup({ deletePostID, setisDeletePopupClick, isDeletePopupClick }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const deletepost = posts.find((post) => post.postID === deletePostID);

  return (
    <StyleModal
      show={isDeletePopupClick}
      handleClose={() => {
        setisDeletePopupClick(false);
      }}>
      <div className={styles.leftModel}>
        {deletepost ? <Post post={deletepost} isFromDelete={true} /> : ''}
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
    </StyleModal>
  );
}

DeletePopup.propTypes = {
  deletePostID: PropTypes.string.isRequired,
  setisDeletePopupClick: PropTypes.func.isRequired,
  isDeletePopupClick: PropTypes.bool.isRequired,
};

export default DeletePopup;
