import React from 'react';
import PropTypes from 'prop-types';
import Heart from './Heart';
import Comment from './Comment';
import Commenting from './Commenting';
import { useSelector } from 'react-redux';
import '../style/post.css';
import EditPostBar from './EditPostBar';

function Post({ post }) {
  console.log(post);
  const { postID, postIssuer, postImage, postLikes } = post;
  const user = useSelector((state) => state.user);
  const comments = useSelector((state) => state.comments);

  const commentList = comments.filter((comment) => comment.postID === postID);
  return (
    <div className='post'>
      <div className='postHeader'>
        <div>
          <img src={postIssuer.postIssuerImage}></img>
        </div>
        <div className='postProfileName'>{postIssuer.postIssuerName}</div>
        <EditPostBar postID={postID} postIssuerID={postIssuer.postIssuerID} />
      </div>
      <img className='photo' src={postImage.postImageLink}></img>
      <div className='postInteraction'>
        <Heart id={postID} likes={postLikes} isfrom='post' />
        <div className='postLikeCount'>{postLikes.length}</div>
      </div>
      <div className='PostComments'>查看留言...</div>
      <div>
        {commentList.map((comment) => {
          console.log(comment);
          return <Comment key={comment.commentID} comment={comment} />;
        })}
        {user ? (
          <>
            <div className='separater'></div>
            <Commenting postID={post.postID} />
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    postID: PropTypes.string.isRequired,
    postImage: PropTypes.shape({
      postImageLink: PropTypes.string.isRequired,
    }),
    postIssuer: PropTypes.shape({
      postIssuerID: PropTypes.string.isRequired,
      postIssuerName: PropTypes.string.isRequired,
      postIssuerImage: PropTypes.string.isRequired,
    }),
    postLikes: PropTypes.array.isRequired,
  }),
  setDeletePost: PropTypes.func,
};

export default Post;
