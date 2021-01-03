import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditPostBar from './EditPostBar';
import Comment from './Comment';
import { StyleModal } from './PopupModal';
import Commenting from './Commenting';
import { fetchComments } from '../redux/actions/commentAction';
import styles from '../style/editpostpopup.module.css';
import postblock from '../style/postblock.module.css';

function PostPopup({
  post,
  clickPostID,
  setisPostClick,
  isPostClick,
  isDeletePopup,
  setIsDeletePopup,
}) {
  const { postID, postIssuer, postImage, postLikes, postTime, postTag, postMessage } = post;
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);
  const clickpost = posts.find((post) => post.postID === clickPostID);
  // postComments: 符合post id的
  const [postComments, setPostComments] = useState([]);
  const [clickEdit, setclickEdit] = useState('');
  const [lastSnap, setLastSnap] = useState('');
  const [lastVisible, setLastVisible] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let commentsList = comments.map((comment) => {
      if (comment.postID === postID) {
        return comment;
      }
    });
    setPostComments(commentsList);
  }, [comments]);

  useEffect(() => {
    dispatch(fetchComments(clickPostID, lastSnap, setLastSnap, lastVisible));
  }, [lastVisible]);

  return (
    <StyleModal
      show={isPostClick}
      handleClose={() => {
        setisPostClick(false);
      }}>
      {clickpost && (
        <div className={styles.modelWrap}>
          <div className={styles.topModel}>
            <div className={styles.space}></div>
            <Link
              to={(location) => `/profile?id=${postIssuer.postIssuerID}`}
              style={{ textDecoration: 'none' }}>
              <img
                className={postblock.postProfileImage}
                src={clickpost.postIssuer.postIssuerImage}></img>
            </Link>

            <div className={postblock.postProfileName}>{clickpost.postIssuer.postIssuerName}</div>

            {user && user.uid === clickpost.postIssuer.postIssuerID && (
              <EditPostBar
                postID={clickPostID}
                postIssuerID={clickpost.postIssuer.postIssuerID}
                clickEdit={clickEdit}
                setclickEdit={setclickEdit}
                isDeletePopup={isDeletePopup}
                setIsDeletePopup={setIsDeletePopup}
                setisPostClick={setisPostClick}
              />
            )}
          </div>
          <div className={postblock.separater}></div>
          <div className={styles.buttonModal}>
            <div className={styles.leftModel} style={{ display: 'block' }}>
              <div className={postblock.postPictureWrap}>
                <img className={postblock.postPicture} src={clickpost.postImage.postImageLink} />
              </div>
              <div className={postblock.messageBlock}>
                {postMessage}
                <br />
                <br />
              </div>
            </div>

            <div className={postblock.rightModel}>
              <div className={postblock.commentsWrap}>
                {postComments &&
                  postComments.map((postComment) => {
                    if (postComment) {
                      return (
                        <>
                          <Comment
                            key={postComment.commentID}
                            comment={postComment}
                            setPostComments={setPostComments}
                            postComments={postComments}
                          />
                        </>
                      );
                    }
                  })}

                {postComments.length > 9 ? (
                  <div
                    onClick={() => {
                      let newLast = lastVisible + 5;
                      setLastVisible(newLast);
                    }}>
                    +
                  </div>
                ) : (
                  ''
                )}
              </div>
              {user && (
                <div className={postblock.commenting}>
                  <Commenting postID={postID} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </StyleModal>
  );
}

PostPopup.propTypes = {
  clickPostID: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired,
  setisPostClick: PropTypes.func.isRequired,
  setIsDeletePopup: PropTypes.func.isRequired,
  isPostClick: PropTypes.bool.isRequired,
  clickEdit: PropTypes.bool.isRequired,
  isDeletePopup: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
};

export default PostPopup;
