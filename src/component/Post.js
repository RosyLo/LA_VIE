import { React, useState } from 'react';
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

function Post({ post, isFromDelete, isFromUpload, isfromWelcome, clickEdit, setclickEdit }) {
  const { postID, postIssuer, postImage, postLikes, postTime, postTag, postMessage } = post;
  const user = useSelector((state) => state.user);
  const comments = useSelector((state) => state.comments);
  const commentList = comments.filter((comment) => comment.postID === postID);
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
                  to={{
                    pathname: `/profile/?id=${postIssuer.postIssuerID}`,
                    state: { postIssuer: postIssuer, clickFrom: 'post' },
                  }}>
                  <img className={styles.postProfileImage} src={postIssuer.postIssuerImage}></img>
                </Link>
              </div>
              <div>{postIssuer.postIssuerName}</div>
            </>
          )}
          {isFromDelete || isFromUpload || isfromWelcome ? (
            ''
          ) : (
            <EditPostBar
              postID={postID}
              postIssuerID={postIssuer.postIssuerID}
              clickEdit={clickEdit}
              setclickEdit={setclickEdit}
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
          {isFromDelete || isFromUpload || isfromWelcome ? (
            <>
              <div className='heart heart-like'></div>
              <div>#{postTag}</div>
            </>
          ) : (
            <>
              <Heart id={postID} likes={postLikes} isfrom='post' />
              {isfromWelcome ? '' : <div className={styles.postLikeCount}>{postLikes.length}</div>}
              {isfromWelcome ? (
                ''
              ) : (
                <>
                  <div className={styles.postTag}>#{postTag}</div>
                </>
              )}
            </>
          )}
        </div>
        <>
          <div
            className={styles.postComments}
            onClick={() => {
              setisPostClick(true);
              // setclickPostID(postID);
            }}>
            See More...
          </div>

          {user && !isFromDelete && !isFromUpload ? (
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
      {isPostClick ? (
        <PostPopup
          isFromDelete={isFromDelete}
          isFromUpload={isFromUpload}
          setisPostClick={setisPostClick}
          isPostClick={isPostClick}
          clickPostID={postID}
          postID={postID}
          post={post}
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
    postTime: PropTypes.string,
    postMessage: PropTypes.string,
    postTag: PropTypes.string,
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
  isFromDelete: PropTypes.bool,
  isFromUpload: PropTypes.bool,
  isfromWelcome: PropTypes.bool,
  clickEdit: PropTypes.string,
};

export default Post;
