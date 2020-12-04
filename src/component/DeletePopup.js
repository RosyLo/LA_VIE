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
  console.log(deletePostID);

  return (
    <StyleModal
      show={isDeletePopupClick}
      handleClose={() => {
        setisDeletePopupClick(false);
      }}>
      <div className={styles.leftModel}>{deletepost ? <Post post={deletepost} /> : ''}</div>

      <div className={styles.rightModel}>
        <div className={styles.decideBlock}>
          <h3>確定刪除？</h3>
          <p>刪除後就回不來囉</p>
          <button
            className={styles.decideButton}
            onClick={() => {
              setisDeletePopupClick(false);
            }}>
            返回
          </button>
          <button
            className={styles.decideButton}
            onClick={() => {
              dispatch(deletePost(deletepost, setisDeletePopupClick));
            }}>
            刪除
          </button>
        </div>
      </div>
    </StyleModal>

    // <div className={styles.leftModel}>
    //         <Post post={deletepost} />
    //       </div>
    //       <div className={styles.rightModel}>
    //         <div className={styles.decideBlock}>
    //           <h3>確定刪除？</h3>
    //           <p>刪除後就回不來囉</p>
    //           <button
    //             className={styles.decideButton}
    //             onClick={() => {
    //               isDeletePopupClick(false);
    //             }}>
    //             返回
    //           </button>
    //           <button
    //             className={styles.decideButton}
    //             onClick={() => {
    //               dispatch(deletePost(deletepost, isDeletePopupClick));
    //             }}>
    //             刪除
    //           </button>
    //         </div>
    //       </div>
    // <>
    //   <div className={styles.modal}>
    //     <div className={styles.leftModel}>
    //       <Post post={deletepost} />
    //     </div>
    //     <div className={styles.rightModel}>
    //       <div className={styles.decideBlock}>
    //         <h3>確定刪除？</h3>
    //         <p>刪除後就回不來囉</p>
    //         <button
    //           className={styles.decideButton}
    //           onClick={() => {
    //             setDeletePost('');
    //           }}>
    //           返回
    //         </button>
    //         <button
    //           className={styles.decideButton}
    //           onClick={() => {
    //             dispatch(deletePost(deletepost, setDeletePost));
    //           }}>
    //           刪除
    //         </button>
    //       </div>
    //     </div>
    //     <button
    //       className={styles.cancelButton}
    //       onClick={() => {
    //         setDeletePost('');
    //       }}>
    //       &times;
    //     </button>
    //   </div>
    //   <div className={styles.overlay}></div>
    // </>
  );
}

DeletePopup.propTypes = {
  deletePostID: PropTypes.string.isRequired,
  setisDeletePopupClick: PropTypes.func.isRequired,
  isDeletePopupClick: PropTypes.bool.isRequired,
};

export default DeletePopup;
