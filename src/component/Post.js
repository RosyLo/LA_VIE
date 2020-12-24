import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Heart from './Heart';
import Comment from './Comment';
import Commenting from './Commenting';
import { useSelector } from 'react-redux';
import styles from '../style/post.module.css';
import EditPostBar from './EditPostBar';
import ProfileImage from './ProfileImage';
import PostPopup from './PostPopup';
import { Link } from 'react-router-dom';
import '../style/heart.css';
import '../style/heart.css';

function Post({
  post,
  isFromDelete,
  isFromUpload,
  isFromEdit,
  isfromWelcome,
  clickEdit,
  setclickEdit,
  isDeletePopup,
  setIsDeletePopup,
}) {
  const { postID, postIssuer, postImage, postLikes, postTime, postTag, postMessage } = post;
  const user = useSelector((state) => state.user);
  const postcomments = useSelector((state) => state.postcomments);
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    let newList = postcomments.filter((comment) => comment.postID === postID);
    console.log(newList);
    setCommentList(newList);
  }, [postcomments]);
  // const commentList = postcomments.filter((comment) => comment.postID === postID);
  console.log(post);
  const [isPostClick, setisPostClick] = useState(false);
  return (
    <>
      <div className={styles.post}>
        <div className={styles.postHeader}>
          {isfromWelcome ? (
            ''
          ) : (
            <>
              <div>
                <Link
                  to={(location) => `/profile?id=${postIssuer.postIssuerID}`}
                  style={{ textDecoration: 'none' }}>
                  <img className={styles.postProfileImage} src={postIssuer.postIssuerImage}></img>
                </Link>
              </div>
              <Link
                to={(location) => `/profile?id=${postIssuer.postIssuerID}`}
                style={{ textDecoration: 'none' }}>
                <div className={styles.postIssuerName}>{postIssuer.postIssuerName}</div>
              </Link>
            </>
          )}
          {isFromDelete || isFromUpload || isfromWelcome || isFromEdit ? (
            ''
          ) : (
            <EditPostBar
              postID={postID}
              postIssuerID={postIssuer.postIssuerID}
              clickEdit={clickEdit}
              setclickEdit={setclickEdit}
              isDeletePopup={isDeletePopup}
              setIsDeletePopup={setIsDeletePopup}
              setisPostClick={setisPostClick}
            />
          )}
        </div>
        <div className={styles.authorPic}>
          <div
            className={styles.picOverlay}
            onClick={() => {
              setisPostClick(true);
              // setclickPostID(postID);
            }}>
            <div className={styles.content}>
              <div className={styles.textspan}>{postMessage}</div>
            </div>
          </div>
          <img className={styles.photo} src={postImage.postImageLink}></img>
        </div>
        <div className={styles.postInteraction}>
          {isFromDelete || isFromUpload || isfromWelcome || isFromEdit ? (
            <>
              <div className='HeartAnimation animate'></div>
              <div style={{ width: '170px' }}></div>
              <div>#{postTag.value}</div>
            </>
          ) : (
            <>
              <Heart id={postID} likes={postLikes} isfrom='post' />
              {isfromWelcome ? '' : <div className={styles.postLikeCount}>{postLikes.length}</div>}
              {isfromWelcome ? (
                ''
              ) : (
                <>
                  <div className={styles.postTag}>#{postTag.value}</div>
                </>
              )}
            </>
          )}
        </div>
        <>
          {isfromWelcome || !user ? (
            ''
          ) : (
            <div
              className={styles.postComments}
              onClick={() => {
                setisPostClick(true);
                // setclickPostID(postID);
              }}>
              See More...
            </div>
          )}
          {user && !isFromDelete && !isFromUpload && !isFromEdit ? (
            <>
              {commentList.map((comment) => {
                return <Comment key={comment.commentID} comment={comment} />;
              })}
              <div className={styles.separater}></div>
              <Commenting postID={postID} />
            </>
          ) : (
            ''
          )}
        </>
      </div>
      {isPostClick && user ? (
        <PostPopup
          isFromDelete={isFromDelete}
          isFromUpload={isFromUpload}
          setisPostClick={setisPostClick}
          isPostClick={isPostClick}
          clickPostID={postID}
          postID={postID}
          post={post}
          isDeletePopup={isDeletePopup}
          setIsDeletePopup={setIsDeletePopup}
        />
      ) : (
        ''
      )}
    </>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    postID: PropTypes.string,
    postTime: PropTypes.object,
    postMessage: PropTypes.string,
    postTag: PropTypes.object,
    postImage: PropTypes.shape({
      postImageLink: PropTypes.string,
    }),
    postIssuer: PropTypes.shape({
      postIssuerID: PropTypes.string,
      postIssuerName: PropTypes.string,
      postIssuerImage: PropTypes.string,
    }),
    postLikes: PropTypes.array,
  }),
  setDeletePost: PropTypes.func,
  setclickEdit: PropTypes.func,
  setIsDeletePopup: PropTypes.func,
  isFromDelete: PropTypes.bool,
  isFromUpload: PropTypes.bool,
  isFromEdit: PropTypes.bool,
  isfromWelcome: PropTypes.bool,
  isDeletePopup: PropTypes.bool,
  clickEdit: PropTypes.string,
};

export default Post;
