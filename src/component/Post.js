import React from 'react';
import PropTypes from 'prop-types';
import Heart from './Heart';
import '../style/post.css';

function Post({ post }) {
  const { postIssuer, postImage, postLikes } = post;

  return (
    <div className='post'>
      <div className='postHeader'>
        <div>
          <img src={postIssuer.postIssuerImage}></img>
        </div>
        <div className='postProfileName'>{postIssuer.postIssuerName}</div>
        {/* <div>{isEitable ? '...' : ''}</div> */}
      </div>
      <img className='photo' src={postImage.postImageLink}></img>
      <div>
        <Heart postID={post.postID} postLikes={postLikes} />
        <div></div>
        <div className='postLikeCount'>{postLikes.length}</div>
      </div>
      <div className='PostComments'>
        查看留言...
        <div className='separater'></div>
      </div>
      <div className='commenting'>
        <input></input>
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
