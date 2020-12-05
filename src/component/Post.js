import React from 'react';
import PropTypes from 'prop-types';
import Heart from './Heart';
import Comment from './Comment';
import Commenting from './Commenting';
import { useSelector } from 'react-redux';
import styles from '../style/post.module.css';
import EditPostBar from './EditPostBar';
import '../style/heart.css';

function Post({ post, isFromDelete, isFromUpload, isfromWelcome }) {
  const { postID, postIssuer, postImage, postLikes } = post;
  const user = useSelector((state) => state.user);
  const comments = useSelector((state) => state.comments);
  const commentList = comments.filter((comment) => comment.postID === postID);
  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        {isfromWelcome ? (
          ''
        ) : (
          <>
            <div>
              <img className={styles.postProfileImage} src={postIssuer.postIssuerImage}></img>
            </div>
            <div>{postIssuer.postIssuerName}</div>
          </>
        )}
        <EditPostBar postID={postID} postIssuerID={postIssuer.postIssuerID} />
      </div>
      <img className={styles.photo} src={postImage.postImageLink}></img>
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
            {isfromWelcome ? '' : <div className={styles.PostComments}>查看留言...</div>}
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
