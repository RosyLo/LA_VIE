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

function Post({ post, isFromDelete, isFromUpload, isfromWelcome }) {
  const { postID, postIssuer, postImage, postLikes } = post;
  const user = useSelector((state) => state.user);
  const comments = useSelector((state) => state.comments);
  const commentList = comments.filter((comment) => comment.postID === postID);
  const [isPostClick, setisPostClick] = useState(false);
  const [clickPost, setclickPost] = useState('');

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
            <EditPostBar postID={postID} postIssuerID={postIssuer.postIssuerID} />
          )}
        </div>
        <img
          className={styles.photo}
          src={postImage.postImageLink}
          onClick={() => {
            setisPostClick(true);
            setclickPost(postID);
          }}></img>
        <div className={styles.postInteraction}>
          {isFromDelete || isFromUpload || isfromWelcome ? (
            <>
              <div className='heart heart-like'></div>
              {/* <div className={styles.postLikeCount}>{postLikes.length}</div> */}
            </>
          ) : (
            <>
              <Heart id={postID} likes={postLikes} isfrom='post' />
              {isfromWelcome ? '' : <div className={styles.postLikeCount}>{postLikes.length}</div>}
              {isfromWelcome ? (
                ''
              ) : (
                <div
                  className={styles.PostComments}
                  onClick={() => {
                    setisPostClick(true);
                    setclickPost(postID);
                  }}>
                  See More...
                </div>
              )}
            </>
          )}
        </div>
        {commentList.map((comment) => {
          return <Comment key={comment.commentID} comment={comment} />;
        })}
        {user && !isFromDelete && !isFromUpload ? (
          <>
            <div className={styles.separater}></div>
            <Commenting postID={post.postID} />
          </>
        ) : (
          ''
        )}
      </div>
      <PostPopup setisPostClick={setisPostClick} isPostClick={isPostClick} clickPost={postID} />
    </>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    postID: PropTypes.string,
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
  isFromDelete: PropTypes.bool,
  isFromUpload: PropTypes.bool,
  isfromWelcome: PropTypes.bool,
};

export default Post;
