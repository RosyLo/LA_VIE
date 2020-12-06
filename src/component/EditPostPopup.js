import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { deletePost } from '../redux/actions';
import styles from '../style/popup.module.css';
import { StyleModal } from './PopupModal';

function EditPostPopup({ editPostID, setisEditPopupClick, isEditPopupClick }) {
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

EditPostPopup.propTypes = {
  editPostID: PropTypes.string.isRequired,
  setisEditPopupClick: PropTypes.func.isRequired,
  isEditPopupClick: PropTypes.bool.isRequired,
};

export default EditPostPopup;
