import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import EditPostBar from './EditPostBar';
import Comment from './Comment';
import Commenting from './Commenting';
import { deletePost } from '../redux/actions';
import { StyleModal } from './PopupModal';
import styles from '../style/editpostpopup.module.css';
// import poststyles from '../style/post.module.css';
import postblock from '../style/postblock.module.css';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

function PostPopup({ post, clickPostID, setisPostClick, isPostClick }) {
  const { postID, postIssuer, postImage, postLikes, postTime, postTag, postMessage } = post;
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const clickpost = posts.find((post) => post.postID === clickPostID);
  const [postComments, setPostComments] = useState([]);
  const [clickEdit, setclickEdit] = useState('');

  let comments = [];

  // first get comments
  useEffect(() => {
    const db = firebase.firestore();
    db.collection('Comment')
      .orderBy('commentTime', 'desc')
      .where('postID', '==', clickPostID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          comments.push(doc.data());
        });
        setPostComments(comments);
      });
  }, []);

  //add comment
  useEffect(() => {
    const db = firebase.firestore();
    const ref = db.collection('Comment').orderBy('commentTime', 'desc');
    ref.onSnapshot((querySnapshot) => {
      let refreshComments = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().postID === postID) {
          refreshComments.push(doc.data());
        }
      });
      setPostComments(refreshComments);
    });
  }, []);

  return (
    <StyleModal
      show={isPostClick}
      handleClose={() => {
        setisPostClick(false);
      }}>
      {clickpost ? (
        <div className={styles.modelWrap}>
          <div className={styles.topModel}>
            <Link to={(location) => `/profile?id=${user.uid}`}>
              {' '}
              <img
                className={postblock.postProfileImage}
                src={clickpost.postIssuer.postIssuerImage}></img>
            </Link>

            <div className={postblock.postProfileName}>{clickpost.postIssuer.postIssuerName}</div>

            {user && user.uid === clickpost.postIssuer.postIssuerID ? (
              <EditPostBar
                postID={clickPostID}
                postIssuerID={clickpost.postIssuer.postIssuerID}
                clickEdit={clickEdit}
                setclickEdit={setclickEdit}
              />
            ) : (
              ''
            )}
          </div>
          <div className={styles.separater}></div>
          <div className={styles.buttonModal}>
            <div className={styles.leftModel} style={{ display: 'block' }}>
              <div className={postblock.postPictureWrap}>
                <img className={postblock.postPicture} src={clickpost.postImage.postImageLink} />
              </div>
              <div className={postblock.messageBlock}>
                {postMessage}
                <br />
                <br />
                {/* <div className={styles.postTime}>- {clickpost.postTime}</div> */}
              </div>
            </div>

            <div className={styles.rightModel}>
              <div className={postblock.commentsWrap}>
                {postComments
                  ? postComments.slice(0, 10).map((postComment) => {
                      return (
                        <Comment
                          key={postComment.commentID}
                          comment={postComment}
                          setPostComments={setPostComments}
                          postComments={postComments}
                        />
                      );
                    })
                  : ''}
                {user ? (
                  <>
                    <div className={styles.separater}></div>
                    <Commenting postID={postID} />
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </StyleModal>
  );
}

PostPopup.propTypes = {
  clickPostID: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired,
  setisPostClick: PropTypes.func.isRequired,
  isPostClick: PropTypes.bool.isRequired,
  clickEdit: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
};

export default PostPopup;
