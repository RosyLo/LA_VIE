import React from 'react';
import PropTypes from 'prop-types';
import Heart from './Heart';
import Comment from './Comment';
import Commenting from './Commenting';
import { useSelector } from 'react-redux';
import '../style/post.css';
import EditPostBar from './EditPostBar';

function Post({ post }) {
  const { postID, postIssuer, postImage, postLikes } = post;
  const user = useSelector((state) => state.user);
  const comments = useSelector((state) => state.comments);
  const isPostComment = comments.find((comment) => comment.postID === postID);
  return (
    <div className='post'>
      <div className='postHeader'>
        <div>
          <img src={postIssuer.postIssuerImage}></img>
        </div>
        <div className='postProfileName'>{postIssuer.postIssuerName}</div>
        <EditPostBar postID={post.postID} postIssuerID={postIssuer.postIssuerID} />
      </div>
      <img className='photo' src={postImage.postImageLink}></img>
      <div className='postInteraction'>
        <Heart postID={postID} postLikes={postLikes} />
        <div className='postLikeCount'>{postLikes.length}</div>
      </div>
      <div className='PostComments'>查看留言...</div>
      <div>
        {isPostComment
          ? comments.map((comment) => {
              console.log(comment);
              return (
                <Comment
                  key={comment.commentID}
                  commentIssuerMessage={comment.commentIssuerMessage}
                  commentImage={postIssuer.postIssuerImage}
                />
              );
            })
          : ''}
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
};

export default Post;
